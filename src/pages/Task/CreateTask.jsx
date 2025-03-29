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
import { MaterialIcons } from "@expo/vector-icons";
import { useCreateTaskMutation } from "../../redux/services/taskService";
import CustomButton from "../../shared/CustomButton";

const CreateTask = () => {
  const [taskSubject, setTaskSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const STAUS = ["Pending", "In-Progress", "Completed"];

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const today = moment().startOf("day"); // Get today's date with time set to 00:00:00

  const handleSaveTask = async () => {
    if (!taskSubject || !description || !startDate || !endDate) {
      showToast("All fields are required!");
      return;
    }
    try {
      const response = await createTask({
        title: taskSubject,
        description: description,
        task_color: "#4A90E2",
        task_font_family: "Arial",
        description_color: "#333333",
        description_font_family: "Verdana",
        from_date: startDate,
        to_date: endDate,
        priority: "high",
        is_favorite: true
      }).unwrap();

      showToast(response?.message || "Task saved successfully!");
      navigation.navigate(RouterConstant.MYTASK, {
        isFrom: RouterConstant.MYTASK
      });
      clearFields();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const clearFields = () => {
    setTaskSubject("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    if (isFocused) {
      clearFields();
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Create Task</Text>

          {/* Task Subject */}
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="edit"
              size={20}
              color="#fff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Task Subject"
              placeholderTextColor="#ddd"
              value={taskSubject}
              onChangeText={setTaskSubject}
            />
          </View>

          {/* Task Description */}
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="edit"
              size={20}
              color="#fff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Task Description"
              placeholderTextColor="#ddd"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/* Start Date */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowStartDatePicker(true)}
          >
            <MaterialIcons
              name="calendar-today"
              size={20}
              color="#fff"
              style={styles.inputIcon}
            />
            <Text style={styles.dateText}>
              {startDate
                ? moment(startDate).format("MMMM D, YYYY")
                : "Select Start Date"}
            </Text>
          </TouchableOpacity>

          {/* End Date */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowEndDatePicker(true)}
            disabled={!startDate}
          >
            <MaterialIcons
              name="calendar-today"
              size={20}
              color="#fff"
              style={styles.inputIcon}
            />
            <Text style={styles.dateText}>
              {endDate
                ? moment(endDate).format("MMMM D, YYYY")
                : "Select End Date"}
            </Text>
          </TouchableOpacity>

          {/* Start Date Picker */}
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate ? new Date(startDate) : new Date()} // Default picker to today
              mode="date"
              minimumDate={new Date()} // Restrict past dates
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (event.type === "dismissed") {
                  setStartDate(null);
                } else if (selectedDate) {
                  setStartDate(moment(selectedDate).format("YYYY-MM-DD"));
                  setEndDate(null);
                }
              }}
            />
          )}

          {/* End Date Picker */}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate ? new Date(endDate) : new Date()} // Default to today
              mode="date"
              minimumDate={
                startDate
                  ? new Date(moment(startDate).format("YYYY-MM-DD"))
                  : new Date()
              }
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);

                if (event.type === "dismissed") {
                  setEndDate(null);
                } else if (selectedDate) {
                  setEndDate(moment(selectedDate).format("YYYY-MM-DD"));
                }
              }}
            />
          )}

          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "500",
              marginBottom: 10
            }}
          >
            Task Status
          </Text>

          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 30 }}
          >
            {STAUS?.map((item, i) => (
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  marginHorizontal: 6,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: item === "Pending" ? "white" : "gray",
                  backgroundColor: "#FFFFFF1A"
                }}
                key={i}
              >
                <Text
                  style={{
                    color: item === "Pending" ? "white" : "gray",
                    fontSize: 15,
                    fontWeight: "500"
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Save Button */}
          <CustomButton
            onPress={handleSaveTask}
            title="Create Task"
            colors={["#FF4081", "#FF9800"]}
            isLoading={isLoading}
          />
          <View style={styles.buttonWrapper} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5F33E1",
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    width: screenWidth(),
    padding: 20,
    marginTop: 60
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  },
  buttonWrapper: {
    height: 130,
    width: screenWidth()
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    color: "#fff"
  },
  dateText: {
    color: "#ddd"
  }
});
