import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import ConfirmationModal from "../../shared/ConfirmationModal";
import TaskCard from "./component/TaskCard";
import EmptyComponent from "../../shared/EmptyComponent";
import {
  useDeleteTaskMutation,
  useGetActiveTasksQuery
} from "../../redux/services/taskService";
import { useSelector } from "react-redux";
import { showToast } from "../../utils/Toast";
import { RouterConstant } from "../../constants/RouterConstant";

const MyTasks = ({ route }) => {
  const isFrom = route?.params?.isFrom || "";
  console.log("----", isFrom);

  const [selectedTask, setSelectedTask] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { data, error, isLoading, refetch } = useGetActiveTasksQuery({
    userId: user?.userId
  });
  const [deleteTask, { isLoading: deleteTaskLoading }] =
    useDeleteTaskMutation();

  useEffect(() => {
    if (isFrom === RouterConstant.MYTASK) {
      console.log("Comes from My Task");

      refetch();
    }
  }, [isFrom]);

  const confirmDeleteTask = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setSelectedTask("");
    setIsModalVisible(false);
  };

  const handleDeleteTask = async () => {
    try {
      const response = await deleteTask({
        taskId: selectedTask?._id
      }).unwrap();
      refetch();
      setIsModalVisible(false);
      showToast(response?.message);
    } catch (error) {
      showToast(error?.data?.message);
    }
  };

  return (
    <Safewrapper>
      <AppHeader title={"My Tasks"} />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.tasks}
          keyExtractor={(item) => item?._id}
          contentContainerStyle={
            data?.tasks.length === 0 ? styles.emptyListContainer : {}
          }
          renderItem={({ item, index }) => (
            <TaskCard item={item} handleDelete={confirmDeleteTask} />
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
          description={`Are you sure you want to delete this task: ?`}
          handleConfirm={handleDeleteTask}
          isLoading={deleteTaskLoading}
        />
      </View>
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
