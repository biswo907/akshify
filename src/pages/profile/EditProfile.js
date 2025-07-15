import React, { useEffect, useState } from "react";
import {
  View,
  Text,
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
import { showToast } from "../../utils/Toast";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/reducers/authSlice";
import { getEditProfileSchema } from "../../validation/signupSchema";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [changePassword, setChangePassword] = useState(false);

  const {
    data: profileData,
    isLoading: isProfileLoading,
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

  const validationSchema = getEditProfileSchema(changePassword);

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
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload = {
          full_name: values?.fullName,
          phone: values?.mobile
        };

        if (changePassword) {
          payload.password = values.password;
          payload.confirm_password = values.confirm_password;
        }

        const res = await updateProfile(payload).unwrap();
        showToast(res?.message || "Profile updated successfully!");
        dispatch(setUser(res?.user));
        refetch();
        navigation.goBack();
      } catch (err) {
        console.log("API Error:", err);
        showToast(err?.data?.message || "Failed to update profile");
      }
    }
  });

  useEffect(() => {
    if (profileData?.user) {
      setFieldValue("fullName", profileData.user.full_name);
      setFieldValue("mobile", profileData.user.phone);
      setFieldValue("userName", profileData.user.username);
      setFieldValue("email", profileData.user.email);
    }
  }, [profileData]);

  return (
    <Safewrapper>
      <AppHeader title={"Edit Profile"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          {isProfileLoading ? (
            <ScrollView
              contentContainerStyle={[styles.container, { alignItems: "center", justifyContent: "center" }]}
              keyboardShouldPersistTaps="handled"
            >
              <ActivityIndicator size="large" />
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
            >
              <CustomTextInput
                label="Full Name"
                placeholder="Enter Full Name here"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                errorMessage={touched.fullName && errors.fullName}
              />

              <CustomTextInput
                editable={false}
                label="User Name"
                placeholder="Enter User Name here"
                value={values.userName}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                errorMessage={touched.userName && errors.userName}
              />

              <CustomTextInput
                label="Phone"
                placeholder="Enter Mobile No here"
                value={values.mobile}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                errorMessage={touched.mobile && errors.mobile}
              />

              <CustomTextInput
                editable={false}
                label="Email"
                placeholder="Enter Email here"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                errorMessage={touched.email && errors.email}
              />

              {/* ✅ Change Password Checkbox */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setChangePassword(!changePassword);
                  if (changePassword) {
                    setFieldValue("password", "");
                    setFieldValue("confirm_password", "");
                  }
                }}
              >
                <View style={[styles.checkbox, changePassword && styles.checkedBox]}>
                  {changePassword && <Text style={styles.tick}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Change Password</Text>
              </TouchableOpacity>

              {changePassword && (
                <>
                  <CustomTextInput
                    secureTextEntry
                    label="Password"
                    placeholder="Enter Password here"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    errorMessage={touched.password && errors.password}
                  />
                  <CustomTextInput
                    secureTextEntry
                    label="Confirm Password"
                    placeholder="Enter Confirm Password here"
                    value={values.confirm_password}
                    onChangeText={handleChange("confirm_password")}
                    onBlur={handleBlur("confirm_password")}
                    errorMessage={touched.confirm_password && errors.confirm_password}
                  />
                </>
              )}

              <CustomButton
                title={isLoading ? "Saving..." : "Save Changes"}
                colors={["#5F33E1", "#5F33E1"]}
                onPress={handleSubmit}
                isLoading={isLoading}
              />

              <View style={{ height: 50 }} />
            </ScrollView>
          )}
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
    minHeight: 500
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
