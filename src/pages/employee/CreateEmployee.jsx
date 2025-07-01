import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useFormik } from "formik";
import {
  CreateUserValidationSchema,
  SignupValidationSchema
} from "../../validation/signupSchema";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import CustomTextInput from "../../shared/CustomTextInput";
import CustomButton from "../../shared/CustomButton";
import { showToast } from "../../utils/Toast";
import { useNavigation } from "@react-navigation/native";
import { useCreateEmployeeMutation } from "../../redux/services/apiService";

const CreateEmployee = () => {
  const navigation = useNavigation();

  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const initialValues = {
    fullName: "",
    userName: "",
    mobile: "",
    email: "",
    password: ""
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: CreateUserValidationSchema,
      onSubmit: async (values) => {
        // showToast("Success", "Profile created successfully!");
        console.log(values);
        try {
          const payload = {
            full_name: values.fullName,
            username: values.userName,
            phone: values.mobile,
            email: values.email,
            password: values.password,
            confirm_password: values.password
          };

          const res = await createEmployee(payload).unwrap();

          showToast(res?.message || "Profile created successfully!");
          console.log("API response:", res);

          navigation.goBack(); // or navigation.navigate("SomeScreen")
        } catch (err) {
          console.log("API Error:", err);
          showToast(err?.data?.message || "Failed to create profile");
        }
      }
    });

  return (
    <Safewrapper>
      <AppHeader title={"Create Employee"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <CustomTextInput
              label={"Full Name"}
              placeholder={"Enter Full Name here"}
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              errorMessage={touched.fullName && errors.fullName}
            />
            <CustomTextInput
              label={"User Name"}
              placeholder={"Enter User Name here"}
              value={values.userName}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              errorMessage={touched.userName && errors.userName}
            />
            <CustomTextInput
              label={"Mobile"}
              placeholder={"Enter Mobile No here"}
              keyboardType="numeric"
              value={values.mobile}
              onChangeText={handleChange("mobile")}
              onBlur={handleBlur("mobile")}
              errorMessage={touched.mobile && errors.mobile}
            />
            <CustomTextInput
              label={"Email"}
              placeholder={"Enter Email here"}
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              errorMessage={touched.email && errors.email}
            />
            <CustomTextInput
              label={"Password"}
              placeholder={"Enter Password here"}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              errorMessage={touched.password && errors.password}
            />
            <CustomButton
              title={isLoading ? "Creating..." : "Create"}
              colors={["#5F33E1", "#5F33E1"]}
              onPress={handleSubmit}
              isLoading={isLoading}
            />
            <View style={{ height: 50, width: "100%" }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Safewrapper>
  );
};

export default CreateEmployee;

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
  }
});
