import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [error, setError] = useState(null); // State for error messages

  const handleSignup = async () => {
    setError(null); // Clear any previous errors

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      // Simulate API call (replace with your actual API call)
      // const response = await simulateSignup(username, password); // See function below

      if (true) {
        //response.success
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigation.replace(RouterConstant.HOME);
      } else {
        setError(response.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during signup.");
    }
  };

  const simulateSignup = async (username, password) => {
    // Replace this with your actual API call
    return new Promise(resolve => {
      setTimeout(() => {
        if (username === "testuser" && password === "password") {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid username or password" });
        }
      }, 1000); // Simulate a 1-second API call
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password
      />
      {error &&
        <Text style={styles.errorText}>
          {error}
        </Text>}{" "}
      {/* Display error */}
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  errorText: {
    color: "red",
    marginBottom: 10
  }
});
