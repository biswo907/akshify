import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    full_name: "Biswo",
    username: "biswo",
    phone: "878049999",
    email: "biswoh0@example.com"
  });

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleSave = () => {
    console.log("Updated Profile:", profile);
    // Add API call or local storage logic here
  };

  return (
    <Safewrapper>
      <AppHeader title={"Edit Profile"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {Object.keys(profile).map((key, index) =>
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.label}>
                  {key.replace("_", " ").toUpperCase()}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={key.replace("_", " ")}
                  value={profile[key]}
                  onChangeText={text => handleChange(key, text)}
                  placeholderTextColor="#888"
                />
              </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <View style={{ height: 50, width: "100%" }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Safewrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1
  },
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD"
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#5F33E1",
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
