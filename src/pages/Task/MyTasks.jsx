import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import ConfirmationModal from "../../shared/ConfirmationModal";
import TaskCard from "./component/TaskCard";
import EmptyComponent from "../../shared/EmptyComponent";
import {
  useGetTaskQuery,
  useUpdateTaskStatusMutation
} from "../../redux/services/taskService";
import { useSelector } from "react-redux";
import { showToast } from "../../utils/Toast";
import { RouterConstant } from "../../constants/RouterConstant";
import { useNavigation } from "@react-navigation/native";
import { TaskStatus } from "../../constants/TaskStatus";

const MyTasks = ({ route }) => {
  const isFrom = route?.params?.isFrom || "";
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const { data, isLoading, refetch } = useGetTaskQuery();

  console.log("TASK", data?.tasks?.[0]);

  const [updateTask, { isLoading: updateTaskLoading }] =
    useUpdateTaskStatusMutation();

  useEffect(() => {
    if (isFrom === RouterConstant.MYTASK) {
      refetch();
    }
    refetch();
  }, [isFrom]);

  const confirmDeleteTask = (task) => {
    setSelectedTask(task);

    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalVisible(false);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask?._id) return;
    try {
      const response = await updateTask({
        taskId: selectedTask._id,
        status: "deleted"
      }).unwrap();
      console.log("res", response);

      showToast(response?.message || "Task deleted successfully");
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      console.log("err---biswo", error);

      showToast(error?.data?.message || "Failed to delete task");
    }
  };

  const handlePress = (task) => {
    navigation.navigate(RouterConstant.TASKDETAILS, { task, refetch });
  };

  return (
    <Safewrapper>
      <AppHeader title="My Tasks" />
      {isLoading ? (
        <View
          style={{
            height: "90%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator color={"white"} size={"large"} />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.tasks || []}
            keyExtractor={(item) => item._id}
            contentContainerStyle={
              (data?.tasks?.length || 0) === 0
                ? styles.emptyListContainer
                : null
            }
            renderItem={({ item }) => (
              <TaskCard
                disbled={
                  TaskStatus?.COMPLETED === item?.status ||
                  TaskStatus?.EXPIRED === item?.status
                }
                item={item}
                handleDelete={() => confirmDeleteTask(item)}
                onPress={() => handlePress(item)}
              />
            )}
            ListEmptyComponent={
              <EmptyComponent
                title="No Tasks Available!"
                description="Stay productive by adding a new task."
              />
            }
          />

          <ConfirmationModal
            isVisible={isModalVisible}
            handleCancel={handleCloseModal}
            title="Confirm Delete"
            description={`Are you sure you want to delete this task? ${selectedTask?.title}`}
            handleConfirm={handleDeleteTask}
            isLoading={updateTaskLoading}
          />
        </View>
      )}
    </Safewrapper>
  );
};

export default MyTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
