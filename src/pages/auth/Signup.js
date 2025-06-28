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
import CustomButton from "../../shared/CustomButton";
import { useRegisterMutation } from "../../redux/services/authService";
import { useDispatch } from "react-redux";
import { setIsLogin, setToken, setUser } from "../../redux/reducers/authSlice";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";
import CustomInput from "../../shared/CustomInput";
import { useFormik } from "formik";
import { SignupValidationSchema } from "../../validation/signupSchema";

const SignupScreen = () => {
  const dispatch = useDispatch();
  navigation = useNavigation();

  const initialValues = {
    companyName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const [register, { isLoading }] = useRegisterMutation();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register({
          full_name: values.companyName,
          username: values.username,
          phone: values.phone,
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
          type: "company"
        }).unwrap();

        dispatch(setIsLogin(true));
        dispatch(setUser(response?.user));
        dispatch(setToken(response?.token));
        navigation.reset({
          index: 0,
          routes: [{ name: RouterConstant.TABS }]
        });
        console.log("Success",response);
        
        showToast("Success", "Account created successfully!");
      } catch (error) {
        // console.error("Signup Error:", error);
        Alert.alert(
          "Signup Failed",
          error?.data?.message || "Something went wrong!"
        );
      }
    }
  });

  const handleLogin = () => {
    navigation.navigate(RouterConstant.SIGNIN);
  };

  const bgcolor = `rgba(255, 255, 255, 0.2)`;

  return (
    <Safewrapper colors={["#7A5AE9", "#B892F0"]}>
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
            <Text style={styles.title}> Company Registration !!</Text>

            <CustomInput
              label="Company Name :"
              value={values.companyName}
              onChangeText={handleChange("companyName")}
              onBlur={handleBlur("companyName")}
              errorMessage={
                errors.companyName && touched.companyName && errors.companyName
              }
            />
            <CustomInput
              label="User Name :"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              errorMessage={
                errors.username && touched.username && errors.username
              }
            />
            <CustomInput
              label="Mobile No :"
              value={values.phone}
              maxLength={10}
              keyboardType="number"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              errorMessage={errors.phone && touched.phone && errors.phone}
            />
            <CustomInput
              label="Email :"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              errorMessage={errors.email && touched.email && errors.email}
            />
            <CustomInput
              label="Password :"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              errorMessage={
                errors.password && touched.password && errors.password
              }
            />
            <CustomInput
              label="Confirm Password :"
              value={values.confirm_password}
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              errorMessage={
                errors.confirm_password &&
                touched.confirm_password &&
                errors.confirm_password
              }
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                colors={["#5669FF", "#5669FF"]}
                title={"Signup"}
                onPress={handleSubmit}
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
