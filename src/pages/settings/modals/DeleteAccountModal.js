import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const DeleteAccountModal = ({ isVisible, onClose, onDelete }) => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Entered Password:", password);
    // onDelete(); // Call the delete function
    onClose(); // Close the modal
    setPassword("");
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Delete Your Account</Text>
        <Text style={styles.warningText}>
          Once deleted, your account cannot be recovered.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#ddd"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={!isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleDeleteAccount}>
          <LinearGradient colors={["#E13333", "#E86666"]} style={styles.button}>
            <Text style={styles.buttonText}>Delete Permanently</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10
  },
  warningText: {
    fontSize: 14,
    color: "#FF6666",
    marginBottom: 15,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%"
  },
  input: {
    flex: 1,
    padding: 12,
    color: "#FFF"
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default DeleteAccountModal;
