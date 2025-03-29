import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";

// Sample Task Data (Replace with API data)
const sampleTask = {
  _id: "67cc0c838a6093048b2f307d",
  title: "Design Landing Page For Biswo",
  description: "Create a responsive landing page for the product website.",
  task_color: "#4A90E2",
  description_color: "#333333",
  priority: "high",
  status: "pending"
};

const EditTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params || {};

  const taskData = sampleTask;

  const [title, setTitle] = useState(taskData.title);
  const [description, setDescription] = useState(taskData.description);
  const [priority, setPriority] = useState(taskData.priority);
  const [status, setStatus] = useState(taskData.status);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "In Progress", "Completed"];

  // Handle Save Task
  const handleSave = () => {
    console.log({
      title,
      description,
      priority,
      status
    });
    navigation.goBack();
  };

  return (
    <Safewrapper>
      <AppHeader title="Edit Task" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title Input */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />

        {/* Description Input */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          multiline
        />

        {/* Priority Dropdown */}
        <Text style={styles.label}>Priority</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowPriorityOptions(!showPriorityOptions)}
        >
          <Text style={styles.dropdownText}>
            {priority}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
        {showPriorityOptions &&
          <View style={styles.optionsContainer}>
            {priorities.map(item =>
              <TouchableOpacity
                key={item}
                style={styles.optionItem}
                onPress={() => {
                  setPriority(item);
                  setShowPriorityOptions(false);
                }}
              >
                <Text style={styles.optionText}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          </View>}

        {/* Status Dropdown */}
        <Text style={styles.label}>Status</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowStatusOptions(!showStatusOptions)}
        >
          <Text style={styles.dropdownText}>
            {status}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
        {showStatusOptions &&
          <View style={styles.optionsContainer}>
            {statuses.map(item =>
              <TouchableOpacity
                key={item}
                style={styles.optionItem}
                onPress={() => {
                  setStatus(item);
                  setShowStatusOptions(false);
                }}
              >
                <Text style={styles.optionText}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          </View>}

        {/* Save & Cancel Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Safewrapper>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  dropdown: {
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16
  },
  optionsContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    marginBottom: 15,
    padding: 5
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555"
  },
  optionText: {
    color: "#fff",
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },
  cancelButton: {
    backgroundColor: "#E74C3C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 10
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  }
});
