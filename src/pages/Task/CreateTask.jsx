import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { screenWidth } from "../../utils/dimensions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";
import moment from "moment";
import { useCreateTaskMutation } from "../../redux/services/taskService";
import CustomButton from "../../shared/CustomButton";
import CustomTextInput from "../../shared/CustomTextInput";
import Safewrapper from "../../shared/Safewrapper";
import { useFormik } from "formik";
import { createTaskValidationSchema } from "../../validation/signupSchema";
import { useSelector } from "react-redux";
import { date } from "yup";

const CreateTask = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user?.type === "employee");

  const [showDatePicker, setShowDatePicker] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const initialValues = {
    taskName: "",
    taskDescription: "",
    date: ""
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema: createTaskValidationSchema,
    onSubmit: async (values) => {
      const preparePayload = {
        title: values?.taskName,
        description: values?.taskDescription,
        to_date: values?.date
      };
      if (user?.type === "employee") {
        preparePayload.companyId = user?.companyId; //only employees are required to pass `companyId` in the body
      }
      if (false) {
        preparePayload.userId = "6862deb451c3a3308152df1d"; // if a commpany assign a user then pass
      }
      console.log("preparePayload", preparePayload);

      try {
        const response = await createTask(preparePayload).unwrap();

        showToast(response?.message || "Task saved successfully!");
        navigation.navigate(RouterConstant.MYTASK, {
          isFrom: RouterConstant.MYTASK
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  });
  console.log(values);

  useEffect(() => {
    if (isFocused) {
      resetForm();
    }
  }, [isFocused]);

  return (
    <Safewrapper>
      {false ? (
        ""
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} behavior="padding">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
          >
            <ScrollView
              contentContainerStyle={styles.container2}
              keyboardShouldPersistTaps="handled"
            >
              <CustomTextInput
                label={"Task Name"}
                placeholder={"Enter Task Name here"}
                value={values.taskName}
                onChangeText={handleChange("taskName")}
                onBlur={handleBlur("taskName")}
                errorMessage={touched.taskName && errors.taskName}
              />
              <CustomTextInput
                label={"Task Description"}
                placeholder={"Enter Task Description here"}
                value={values.taskDescription}
                onChangeText={handleChange("taskDescription")}
                onBlur={handleBlur("taskDescription")}
                errorMessage={touched.taskDescription && errors.taskDescription}
              />
              <CustomTextInput
                label={"Date"}
                placeholder={
                  values?.date
                    ? moment(values?.date).format("MMMM D, YYYY")
                    : "Select Task Date"
                }
                editable={false}
                onPress={() => setShowDatePicker(true)}
                errorMessage={touched.date && errors.date}
              />

              {showDatePicker && (
                <DateTimePicker
                  value={
                    values?.date
                      ? new Date(moment(values?.date).format("YYYY-MM-DD"))
                      : new Date()
                  }
                  mode="date"
                  // minimumDate={new Date()}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (event.type === "dismissed") {
                      setFieldValue("date", "");
                    } else if (selectedDate) {
                      setFieldValue("date", selectedDate);
                      console.log(selectedDate);

                      // setTaskDate(moment(selectedDate).format("YYYY-MM-DD"));
                    }
                  }}
                />
              )}

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
      )}
    </Safewrapper>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  // NEW
  keyboardContainer: {
    flex: 1
  },
  container2: {
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center"
  }
});
