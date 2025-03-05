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
import { useGetActiveTasksQuery } from "../../redux/services/taskService";
import { useSelector } from "react-redux";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { data, error, isLoadinh } = useGetActiveTasksQuery({
    userId: user?.userId
  });

  console.log("Dats", data);

  const confirmDeleteTask = (task, index) => {
    setSelectedTask({ task, index });
    setIsModalVisible(true);
  };

  const deleteTask = async () => {
    try {
      if (!selectedTask) return;
      let updatedTasks = [...tasks];
      updatedTasks.splice(selectedTask.index, 1);

      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting task:", error);
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
            <TaskCard
              item={item}
              index={index}
              handleDelete={confirmDeleteTask}
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
          handleCancel={() => setIsModalVisible(false)}
          title="Confirm Delete"
          description={`Are you sure you want to delete this task: ?`}
          handleConfirm={deleteTask}
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
