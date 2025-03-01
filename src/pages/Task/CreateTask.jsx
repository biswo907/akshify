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
import CustomButton from "../../components/CustomButton";
import { screenWidth } from "../../utils/dimensions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";

const CreateTask = () => {
  const [taskSubject, setTaskSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const today = new Date(); // Get today's date

  const handleSaveTask = async () => {
    if (!taskSubject || !description || !startDate || !endDate) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newTask = {
      taskSubject,
      description,
      startDate: startDate.toISOString().split("T")[0], // Format Date
      endDate: endDate.toISOString().split("T")[0]
    };

    try {
      let tasks = await AsyncStorage.getItem("tasks");
      tasks = tasks ? JSON.parse(tasks) : [];
      tasks.push(newTask);

      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      showToast("Task saved successfully!");
      navigation.navigate(RouterConstant.MYTASK);
      clearFields();
    } catch (error) {
      console.error("Error saving task:", error);
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
          <TextInput
            style={styles.input}
            placeholder="Task Subject"
            value={taskSubject}
            onChangeText={setTaskSubject}
          />

          {/* Task Description */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Start Date Picker */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={{ color: startDate ? "#000" : "#999" }}>
              {startDate
                ? startDate.toISOString().split("T")[0]
                : "Select Start Date"}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || today} // Default picker to today
              mode="date"
              minimumDate={today} // Restrict past dates
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) {
                  setStartDate(selectedDate);
                }
              }}
            />
          )}

          {/* End Date Picker */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowEndDatePicker(true)}
            disabled={!startDate} // Disable until Start Date is selected
          >
            <Text style={{ color: endDate ? "#000" : "#999" }}>
              {endDate
                ? endDate.toISOString().split("T")[0]
                : "Select End Date"}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || startDate || today} // Default to start date
              mode="date"
              minimumDate={startDate || today} // Restrict to start date or later
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}

          {/* Save Button */}
          <CustomButton onPress={handleSaveTask} title="Create Task" />
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
  }
});
