import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import CustomTextInput from "../../shared/CustomTextInput";
import CustomButton from "../../shared/CustomButton";
import { showToast } from "../../utils/Toast";
import { Ionicons } from "@expo/vector-icons";
import { useUpdateTaskMutation } from "../../redux/services/taskService";
import { useSelector } from "react-redux";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const statusOptions = ["in-progress", "completed"];

const validationSchema = Yup.object().shape({
  taskName: Yup.string().required("Task name is required"),
  taskDescription: Yup.string().required("Description is required"),
  status: Yup.string().oneOf(statusOptions).required("Status is required")
});

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task, refetch } = route.params;
  const { user } = useSelector((state) => state.auth);
  const [showDatePicker, setShowDatePicker] = useState(false);

  console.log("TASK", task);

  const [editTask, { isLoading }] = useUpdateTaskMutation();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    touched,
    errors
  } = useFormik({
    initialValues: {
      taskName: task?.title || "",
      taskDescription: task?.description || "",
      status: task?.status || "pending",
      date: task?.to_date,
      prev_date: task?.to_date
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const preparePayload = {
        id: task._id,
        title: values.taskName,
        description: values.taskDescription,
        status: values.status,
        to_date: values?.date,
      };

      if (user?.type === "employee") {
        preparePayload.companyId = user?.companyId;
      }
      if (values?.assignedUsers?.length) {
        preparePayload.userId = values?.assignedUsers?.join(", ");
      }

      try {
        const response = await editTask(preparePayload).unwrap();
        console.log("RES", response);
        if (response?.status === "success") {
          showToast(response?.message || "Task updated successfully!");
          refetch();
          navigation.goBack();
        } else {
          showToast(response?.message);
        }
      } catch (error) {
        console.error("Error", error);
        Alert.alert("Error", "Something went wrong");
      }
    }
  });

  return (
    <Safewrapper>
      <AppHeader title={"Edit Task"} />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomTextInput
          label={"Task Name"}
          placeholder={"Enter Task Name"}
          value={values.taskName}
          onChangeText={handleChange("taskName")}
          onBlur={handleBlur("taskName")}
          errorMessage={touched.taskName && errors.taskName}
        />

        <CustomTextInput
          label={"Task Description"}
          placeholder={"Enter Task Description"}
          value={values.taskDescription}
          onChangeText={handleChange("taskDescription")}
          onBlur={handleBlur("taskDescription")}
          multiline
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
        />

        {showDatePicker && (
          <DateTimePicker
            value={
              values?.date
                ? new Date(moment(values?.date).format("YYYY-MM-DD"))
                : new Date()
            }
            mode="date"
            //  minimumDate={new Date(values?.prev_date)}
            minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (event.type === "dismissed") {
                setFieldValue("date", values?.prev_date);
              } else if (selectedDate) {
                setFieldValue("date", selectedDate);
                console.log(selectedDate);

                // setTaskDate(moment(selectedDate).format("YYYY-MM-DD"));
              }
            }}
          />
        )}

        <Text style={styles.label}>Task Status</Text>
        <View style={styles.statusRow}>
          {statusOptions.map((status) => {
            const isSelected = values.status === status;
            const iconMap = {
              pending: "time-outline",
              inprogress: "refresh-circle-outline",
              completed: "checkmark-circle-outline"
            };

            return (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusChip,
                  isSelected && styles.statusChipSelected
                ]}
                onPress={() => setFieldValue("status", status)}
              >
                <Ionicons
                  name={iconMap[status]}
                  size={20}
                  color={isSelected ? "#fff" : "#555"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.statusChipText,
                    isSelected && styles.statusChipTextSelected
                  ]}
                >
                  {status.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {touched.status && errors.status && (
          <Text style={styles.error}>{errors.status}</Text>
        )}

        <CustomButton
          title={"Update Task"}
          onPress={handleSubmit}
          colors={["#28a745", "#28a745"]}
          isLoading={isLoading}
        />
        <View style={{ height: 50 }} />
      </ScrollView>
    </Safewrapper>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 8,
    color: "white"
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 8
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f2",
    marginRight: 10,
    marginBottom: 10
  },
  statusChipSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff"
  },
  statusChipText: {
    color: "#333",
    fontSize: 14
  },
  statusChipTextSelected: {
    color: "#fff",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4
  }
});
