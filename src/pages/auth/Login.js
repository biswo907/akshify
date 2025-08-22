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
import React from "react";
import Safewrapper from "../../shared/Safewrapper";
import CustomButton from "../../shared/CustomButton";
import { useLoginMutation } from "../../redux/services/authService";
import { useDispatch } from "react-redux";
import { setIsLogin, setToken, setUser } from "../../redux/reducers/authSlice";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";
import CustomInput from "../../shared/CustomInput";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../validation/signupSchema";

const SigninScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initialValues = { email: "", password: "" };
  const [login, { isLoading }] = useLoginMutation();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();
        dispatch(setIsLogin(true));
        dispatch(setUser(response?.user));
        dispatch(setToken(response?.token));

        navigation.reset({
          index: 0,
          routes: [{ name: RouterConstant.TABS }]
        });

        showToast("Success", "Logged in successfully!");
      } catch (error) {
        Alert.alert(
          "Login Failed",
          error?.data?.message || "Something went wrong!"
        );
      }
    }
  });

  return (
    <Safewrapper colors={["#7A5AE9", "#9B6BFA", "#B892F0"]}>
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
            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to your account</Text>

              <CustomInput
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                errorMessage={errors.email && touched.email && errors.email}
              />
              <CustomInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                errorMessage={
                  errors.password && touched.password && errors.password
                }
              />

              <View style={styles.forgotWrapper}>
                <Pressable onPress={() => showToast("Comming Soon !!")}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </Pressable>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  colors={["#5669FF", "#6E7BFF"]}
                  title={"Login"}
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
              </View>
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
    padding: 15,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: "#f1f1f1",
    textAlign: "center",
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10
  },
  forgotWrapper: {
    alignItems: "flex-end",
    marginTop: 10
  },
  forgotText: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline"
  }
});
