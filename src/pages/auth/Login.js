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
import { useLoginMutation, useRegisterMutation } from "../../redux/services/authService";
import { useDispatch } from "react-redux";
import { setIsLogin, setToken, setUser } from "../../redux/reducers/authSlice";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";
import CustomInput from "../../shared/CustomInput";
import { useFormik } from "formik";
import { LoginValidationSchema, SignupValidationSchema } from "../../validation/signupSchema";

const SigninScreen = () => {
  const dispatch = useDispatch();
  navigation = useNavigation();

  

  const initialValues = {
    email: "biswo1@gmail.com",
    password: "123456",
  };

 const [login, { isLoading }] = useLoginMutation();

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
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
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
        console.log("Signup Error:", error);
        Alert.alert(
          "Login Failed",
          error?.data?.message || "Something went wrong!"
        );
      }
    }
  });

  

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
            {/* <Text style={styles.title}> Company / User Login !!</Text> */}

           
            
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
           

            <View style={styles.buttonContainer}>
              <CustomButton
                colors={["#5669FF", "#5669FF"]}
                title={"Login"}
                onPress={handleSubmit}
                isLoading={isLoading} // Shows loader while signing up
              />

           
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Safewrapper>
  );
};

export default SigninScreen;

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
