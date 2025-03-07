import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const TaskCard = ({ item, handleDelete }) => {
  return (
    <View style={styles.taskCard}>
      {/* Left color-coded status bar */}

      <View style={styles.taskContent}>
        {/* Task Title */}
        <Text style={styles.taskTitle}>{item.title}</Text>

        {/* Task Description */}
        <Text style={styles.taskDescription}>{item.description}</Text>

        {/* Task Date Info */}
        <View style={styles.taskDateContainer}>
          <View style={styles.dateItem}>
            <MaterialIcons name="event" size={18} color="#4CAF50" />
            <Text style={styles.taskDateLabel}>From:</Text>
            <Text style={styles.taskDate}>
              {moment(item.startDate).format("MMM D, YYYY")}
            </Text>
          </View>

          <View style={styles.dateItem}>
            <MaterialIcons name="event" size={18} color="#4CAF50" />
            <Text style={styles.taskDateLabel}>To:</Text>
            <Text style={styles.taskDate}>
              {moment(item.endDate).format("MMM D, YYYY")}
            </Text>
          </View>
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 7,
    borderColor: "green",
    overflow: "hidden"
  },
  taskContent: {
    flex: 1,
    paddingLeft: 12
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10
  },
  taskDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  taskDateLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333"
  },
  taskDate: {
    fontSize: 12,
    color: "#5F33E1",
    fontWeight: "600"
  },
  deleteButton: {
    // padding: 6
    position: "absolute",
    right: 8,
    top: 8
  }
});
