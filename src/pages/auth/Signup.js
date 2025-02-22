import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import CustomButton from "../../components/CustomButton";
import { showToast } from "../../utils/Toast";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!username || !password) {
      showToast("Username and password are required.");
      return;
    }
    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
    navigation.replace(RouterConstant.HOME);
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

  const image = {
    uri:
      "https://cdn.pixabay.com/photo/2014/10/18/22/01/remote-login-mast-493768_640.jpg"
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Login</Text>
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
              secureTextEntry
            />

            <CustomButton title={"Login"} onPress={() => handleSignup()} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 16,

    fontWeight: "bold"
  }
});
