import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const EmployeCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.taskCard}
    >
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>
          {item.name}
        </Text>
        <Text style={styles.taskDescription}>
          {item.task}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EmployeCard;

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
  }
});
