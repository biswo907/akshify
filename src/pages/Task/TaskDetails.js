import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Icons
import { useNavigation } from "@react-navigation/native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import { RouterConstant } from "../../constants/RouterConstant";

// Sample Task Data (Replace with API data)
const taskData = {
  _id: "67cc0c838a6093048b2f307d",
  userId: "67cc0c72dc7d690e922096a0",
  title: "Design Landing Page For Biswo",
  description: "Create a responsive landing page for the product website.",
  task_color: "#4A90E2",
  task_font_family: "Arial",
  description_color: "#333333",
  description_font_family: "Verdana",
  from_date: "2025-03-10T00:00:00.000Z",
  to_date: "2025-03-15T00:00:00.000Z",
  priority: "high",
  status: "pending",
  is_favorite: true
};

const TaskDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <Safewrapper>
      <AppHeader title="Task Details" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Task Header with Favorite & Edit Icon */}
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.title,
              {
                color: taskData.task_color,
                fontFamily: taskData.task_font_family
              }
            ]}
          >
            {taskData.title}
          </Text>
          <View style={styles.iconRow}>
            {/* Edit Icon (Navigates to Edit Task Page) */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RouterConstant.EDITTASK, {
                  taskId: taskData._id
                })}
            >
              <MaterialIcons name="edit" size={28} color="#4A90E2" />
            </TouchableOpacity>

            {/* Favorite Icon */}
            <TouchableOpacity>
              <Ionicons
                name={taskData.is_favorite ? "heart" : "heart-outline"}
                size={28}
                color={taskData.is_favorite ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Description */}
        <View style={styles.card}>
          <Text
            style={[
              styles.description,
              {
                color: taskData.description_color,
                fontFamily: taskData.description_font_family
              }
            ]}
          >
            {taskData.description}
          </Text>
        </View>

        {/* Task Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>📅 Start Date</Text>
            <Text style={styles.detailText}>
              {new Date(taskData.from_date).toDateString()}
            </Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>⏳ End Date</Text>
            <Text style={styles.detailText}>
              {new Date(taskData.to_date).toDateString()}
            </Text>
          </View>
        </View>

        {/* Priority & Status Section */}
        <View style={styles.detailsContainer}>
          <View
            style={[
              styles.badge,
              taskData.priority === "high"
                ? styles.highPriority
                : styles.lowPriority
            ]}
          >
            <Text style={styles.badgeText}>
              ⚡ {taskData.priority.toUpperCase()}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              taskData.status === "pending"
                ? styles.pendingStatus
                : styles.completedStatus
            ]}
          >
            <Text style={styles.badgeText}>
              📌 {taskData.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Safewrapper>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  iconRow: {
    flexDirection: "row",
    gap: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  description: {
    fontSize: 16,
    lineHeight: 22
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  detailBox: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5
  },
  detailText: {
    fontSize: 16,
    color: "#ddd"
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },
  highPriority: {
    backgroundColor: "#E74C3C"
  },
  lowPriority: {
    backgroundColor: "#2ECC71"
  },
  pendingStatus: {
    backgroundColor: "#F39C12"
  },
  completedStatus: {
    backgroundColor: "#27AE60"
  }
});
