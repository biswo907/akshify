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
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

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
                <Text style={styles.taskDate}>
                  {item.startDate} → {item.endDate}
                </Text>
              </View>
              <TouchableOpacity onPress={() => confirmDeleteTask(item, index)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this task:{" "}
              <Text style={styles.taskName}>
                {selectedTask?.task.taskSubject}?
              </Text>
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={deleteTask}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5F33E1",
    textAlign: "center",
    marginBottom: 20
  },
  noTasks: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
    marginTop: 50
  },
  taskCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  taskInfo: {
    flex: 1
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5
  },
  taskDate: {
    fontSize: 12,
    color: "#888"
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5F33E1",
    marginBottom: 10
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20
  },
  taskName: {
    fontWeight: "bold",
    color: "red"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: "#ccc"
  },
  deleteButton: {
    backgroundColor: "red"
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});
