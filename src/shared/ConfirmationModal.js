import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ConfirmationModal = ({
  isVisible,
  handleCancel,
  handleConfirm,
  title = "Are you sure?",
  description = "Are you sure you want to proceed with this action?"
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Text Section */}
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle}>
              {title}
            </Text>
            <Text style={styles.modalMessage}>
              {description}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  modalTextContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 5
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#333"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center"
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#ddd"
  },
  cancelText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500"
  },
  confirmText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold"
  }
});
