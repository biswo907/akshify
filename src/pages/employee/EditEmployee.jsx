import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity
} from "react-native";
import { useFormik } from "formik";
import { EditEmployeeValidationSchema } from "../../validation/signupSchema";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import CustomTextInput from "../../shared/CustomTextInput";
import CustomButton from "../../shared/CustomButton";
import { showToast } from "../../utils/Toast";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateEmployeeMutation } from "../../redux/services/apiService";

const EditEmployee = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, refetchEmployee } = route.params;

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const [changePassword, setChangePassword] = useState(false);

  const initialValues = {
    fullName: item?.full_name || "",
    userName: item?.username || "",
    mobile: item?.phone || "",
    email: item?.email || "",
    password: ""
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema: EditEmployeeValidationSchema(changePassword),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload = {
          employeeId: item?._id,
          full_name: values.fullName,
          username: values.userName,
          phone: values.mobile,
          email: values.email
        };

        if (changePassword) {
          payload.password = values.password;
          payload.confirm_password = values.password;
        }

        const res = await updateEmployee(payload).unwrap();
        if (typeof refetchEmployee === "function") {
          refetchEmployee();
        }

        showToast(res?.message || "Employee updated successfully!");
        navigation.goBack();
      } catch (err) {
        console.log("Update Error:", err);
        showToast(err?.data?.message || "Failed to update employee");
      }
    }
  });

  console.log("err", errors);

  return (
    <Safewrapper>
      <AppHeader title={"Edit Employee"} />
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
              editable={false}
              label={"Email"}
              placeholder={"Enter Email here"}
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              errorMessage={touched.email && errors.email}
            />

            {/* ✅ Custom Checkbox UI */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setChangePassword(!changePassword);
                // setFieldValue("password", "");
              }}
              activeOpacity={0.8}
            >
              <View
                style={[styles.checkbox, changePassword && styles.checkedBox]}
              >
                {changePassword && <Text style={styles.tick}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Change Password</Text>
            </TouchableOpacity>

            {/* ✅ Show password input only if checkbox is checked */}
            {changePassword && (
              <CustomTextInput
                label={"New Password"}
                placeholder={"Enter New Password here"}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errorMessage={touched.password && errors.password}
              />
            )}

            <CustomButton
              title={isLoading ? "Updating..." : "Update"}
              colors={["#5F33E1", "#5F33E1"]}
              onPress={handleSubmit}
              isLoading={isLoading}
            />
            <View style={{ height: 50 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Safewrapper>
  );
};

export default EditEmployee;

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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#5F33E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  checkedBox: {
    backgroundColor: "#5F33E1"
  },
  tick: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333"
  }
});
