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

const ChangePasswordModal = ({ isVisible, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(true);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const handleChangePassword = () => {
    // Handle password change logic
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    onClose();
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Change Password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry={!isOldPasswordVisible}
            placeholderTextColor="#ddd"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity
            onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
          >
            <Ionicons
              name={!isOldPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!isNewPasswordVisible}
            placeholderTextColor="#ddd"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
          >
            <Ionicons
              name={!isNewPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleChangePassword}>
          <LinearGradient colors={["#5F33E1", "#9A66E8"]} style={styles.button}>
            <Text style={styles.buttonText}>Update Password</Text>
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
    marginBottom: 15
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

export default ChangePasswordModal;
