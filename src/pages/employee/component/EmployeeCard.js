import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Or any other icon set

const EmployeCard = ({ item, onPress, onToggle,disabled }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggle = () => {
    setModalVisible(false);
    onToggle?.(item); // Call parent function to toggle active state
  };

  return (
    <>
      <TouchableOpacity
      disabled={disabled}
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.taskCard,
          {
            backgroundColor: item?.is_active ? "white" : "#FF7F7F",
            borderColor: item?.is_active ? "green" : "red"
          }
        ]}
      >
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{item.full_name}</Text>
          <Text style={styles.taskDescription}>{item.phone}</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconBtn}>
          <Ionicons
            name={item?.is_active ? "eye-off" : "eye"}
            size={24}
            color={item?.is_active ? "red" : "green"}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalText}>
              You want to {item.is_active ? "disable" : "enable"} this employee?
            </Text>

            <View style={styles.modalActions}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleToggle} style={styles.confirmBtn}>
                <Text style={styles.confirmText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  },
  iconBtn: {
  padding: 8
},
modalBackground: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center"
},
modalContainer: {
  width: "80%",
  backgroundColor: "white",
  padding: 20,
  borderRadius: 10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10
},
modalText: {
  fontSize: 16,
  color: "#333",
  marginBottom: 20,
  textAlign: "center"
},
modalActions: {
  flexDirection: "row",
  gap: 20
},
cancelBtn: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: "#ccc",
  borderRadius: 6
},
cancelText: {
  color: "#333"
},
confirmBtn: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: "#28a745",
  borderRadius: 6
},
confirmText: {
  color: "white",
  fontWeight: "bold"
}

});
