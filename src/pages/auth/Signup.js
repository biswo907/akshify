import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Pressable
} from "react-native";
import React, { useState } from "react";
import Safewrapper from "../../shared/Safewrapper";
import CustomTextInput from "../../shared/CustomTextInput";
import CustomButton from "../../shared/CustomButton";
import { useRegisterMutation } from "../../redux/services/authService";
import { useDispatch } from "react-redux";
import { setIsLogin, setToken, setUser } from "../../redux/reducers/authSlice";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";

const SignupScreen = () => {
  const dispatch = useDispatch();
  navigation = useNavigation();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = () => {
    navigation.navigate(RouterConstant.SIGNIN);
  };

  const handleSignup = async () => {
    if (
      !form.full_name ||
      !form.username ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirm_password
    ) {
      showToast("All fields are required!");
      return;
    }

    if (form.password !== form.confirm_password) {
      showToast("Passwords do not match!");
      return;
    }

    try {
      const response = await register({
        full_name: form.full_name,
        username: form.username,
        phone: form.phone,
        email: form.email,
        password: form.password,
        confirm_password: form.confirm_password
      }).unwrap();

      dispatch(setIsLogin(true));
      dispatch(setUser(response?.user));
      dispatch(setToken(response?.token));
      navigation.reset({
        index: 0,
        routes: [{ name: RouterConstant.TABS }]
      });
      showToast("Success", "Account created successfully!");
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert(
        "Signup Failed",
        error?.data?.message || "Something went wrong!"
      );
    }
  };

  const bgcolor = `rgba(255, 255, 255, 0.2)`;

  return (
    <Safewrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <CustomTextInput
              placeholder="Full Name"
              value={form.full_name}
              onChangeText={(text) => handleChange("full_name", text)}
              backgroundColor={bgcolor}
            />
            <CustomTextInput
              placeholder="Username"
              value={form.username}
              onChangeText={(text) => handleChange("username", text)}
              backgroundColor={bgcolor}
            />
            <CustomTextInput
              placeholder="Phone"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
              backgroundColor={bgcolor}
              maxLength={10}
            />
            <CustomTextInput
              placeholder="Email"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              backgroundColor={bgcolor}
            />
            <CustomTextInput
              placeholder="Password"
              secureTextEntry
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
              backgroundColor={bgcolor}
            />
            <CustomTextInput
              placeholder="Confirm Password"
              secureTextEntry
              value={form.confirm_password}
              onChangeText={(text) => handleChange("confirm_password", text)}
              backgroundColor={bgcolor}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                colors={["#FFD700", "#FFA500"]}
                title={"Signup"}
                onPress={handleSignup}
                isLoading={isLoading} // Shows loader while signing up
              />

              <View style={styles.loginWrapper}>
                <Text style={styles.loginText}>Already have an account !</Text>
                <Pressable onPress={handleLogin}>
                  <Text
                    style={[
                      styles.loginText,
                      { color: "white", fontWeight: "bold" }
                    ]}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Safewrapper>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
  scrollView: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 40
  },
  loginWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },
  loginText: {
    color: "#f7f7f7",
    fontSize: 18
  }
});
