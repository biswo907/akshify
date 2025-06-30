import React, { useEffect, useState } from "react";
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
  Keyboard,
  ActivityIndicator
} from "react-native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation
} from "../../redux/services/apiService";
import CustomButton from "../../shared/CustomButton";
import CustomTextInput from "../../shared/CustomTextInput";
import { useFormik } from "formik";
import { editProfileValidationSchema } from "../../validation/signupSchema";
import { showToast } from "../../utils/Toast";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/reducers/authSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error,
    refetch
  } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const initialValues = {
    fullName: "",
    mobile: "",
    userName: "",
    email: "",
    password: "",
    confirm_password: ""
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
    validationSchema: editProfileValidationSchema,
    onSubmit: async (values) => {
      // showToast("Success", "Profile created successfully!");
      console.log(values);
      try {
        const payload = {
          full_name: values?.fullName,
          phone: values?.phone,
          password: values?.password,
          confirm_password: values?.confirm_password
        };

        const res = await updateProfile(payload).unwrap();

        showToast(res?.message || "Profile Edit successfully!");
        console.log("API response:", res);
        dispatch(setUser(res?.user));

        refetch();
        navigation.goBack(); // or navigation.navigate("SomeScreen")
      } catch (err) {
        console.log("API Error:", err);
        showToast(err?.data?.message || "Failed to create profile");
      }
    }
  });

  useEffect(() => {
    if (profileData) {
      setFieldValue("fullName", profileData?.user?.full_name);
      setFieldValue("mobile", profileData?.user?.phone);
      setFieldValue("userName", profileData?.user?.username);
      setFieldValue("email", profileData?.user?.email);
    }
  }, [profileData]);

  console.log("----", errors);

  return (
    <Safewrapper>
      <AppHeader title={"Edit Profile"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >

          {
            isProfileLoading ? 
             <ScrollView
            contentContainerStyle={[styles.container,{alignItems:"center",justifyContent:"center"}]}
            keyboardShouldPersistTaps="handled"
          >

            <ActivityIndicator size={'large'}/>
          </ScrollView>
            :
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
              editable={false}
              label={"User Name"}
              placeholder={"Enter User Name here"}
              value={values.userName}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              errorMessage={touched.userName && errors.userName}
            />
            <CustomTextInput
              label={"Phone"}
              placeholder={"Enter Mobile No here"}
              value={values.mobile}
              onChangeText={handleChange("mobile")}
              onBlur={handleBlur("mobile")}
              errorMessage={touched.mobile && errors.mobile}
            />
            <CustomTextInput
              editable={false}
              label={"Email"}
              placeholder={"Enter Email id here"}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              errorMessage={touched.email && errors.email}
            />
            <CustomTextInput
              secureTextEntry
              label={"Password"}
              placeholder={"Enter Password here"}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              errorMessage={touched.password && errors.password}
            />
            <CustomTextInput
              secureTextEntry
              label={"Confirm Password"}
              placeholder={"Enter Password here"}
              value={values.confirm_password}
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              errorMessage={touched.confirm_password && errors.confirm_password}
            />

            <CustomButton
              title={isLoading ? "Saving..." : "Save Changes"}
              colors={["#5F33E1", "#5F33E1"]}
              onPress={handleSubmit}
              isLoading={isLoading}
            />

            <View style={{ height: 50, width: "100%" }} />
          </ScrollView>
          }
         


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
    elevation: 5,
    minHeight:500
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
