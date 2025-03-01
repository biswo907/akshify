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
import { MaterialIcons } from "@expo/vector-icons";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import ConfirmationModal from "../../shared/ConfirmationModal";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      let storedTasks = await AsyncStorage.getItem("tasks");
      storedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      setTasks(storedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

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
        {tasks.length === 0 ? (
          <Text style={styles.noTasks}>No tasks available.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskCard}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{item.taskSubject}</Text>
                  <Text style={styles.taskDescription}>{item.description}</Text>

                  <View style={styles.taskDateContainer}>
                    <MaterialIcons
                      name="calendar-today"
                      size={16}
                      color="#5F33E1"
                      style={styles.taskDateIcon}
                    />
                    <Text style={styles.taskDate}>
                      {item.startDate} → {item.endDate}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDeleteTask(item, index)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <ConfirmationModal
          isVisible={isModalVisible}
          handleCancel={() => setIsModalVisible(false)}
          title="Confirm Delete"
          description={`Are you sure you want to delete this task: ${selectedTask?.task.taskSubject} ?`}
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
  taskCard: {
    backgroundColor: "white",
    padding: 9,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 7, // Colored left border
    borderLeftColor: "green" // Primary color
  },
  taskInfo: {
    flex: 1
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8
  },
  taskDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },
  taskDateIcon: {
    marginRight: 6
  },
  taskDate: {
    fontSize: 12,
    color: "#5F33E1", // Primary color
    fontWeight: "600"
  },
  deleteButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    padding: 6
  }
});
