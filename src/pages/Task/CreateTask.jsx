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
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";
import { screenWidth } from "../../utils/dimensions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { showToast } from "../../utils/Toast";

const CreateTask = () => {
  const [taskSubject, setTaskSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const handleSaveTask = async () => {
    if (!taskSubject || !description || !startDate || !endDate) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newTask = {
      taskSubject,
      description,
      startDate,
      endDate
    };

    try {
      let tasks = await AsyncStorage.getItem("tasks");
      tasks = tasks ? JSON.parse(tasks) : [];
      tasks.push(newTask);

      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      showToast("Task saved successfully!");
      navigation.navigate(RouterConstant.HOME);
      clearFields();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const clearFields = () => {
    // Clear inputs after saving
    setTaskSubject("");
    setDescription("");
    setStartDate("");
    setEndDate("");
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

          {/* Start Date */}
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
          />

          {/* End Date */}
          <TextInput
            style={styles.input}
            placeholder="End Date (YYYY-MM-DD)"
            value={endDate}
            onChangeText={setEndDate}
          />

          {/* Save Button */}
          <CustomButton onPress={handleSaveTask} title={`Create Task`} />
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
    backgroundColor: "#303030",
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
    color: "#5F33E1",
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
    backgroundColor: "#fff"
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonWrapper: {
    height: 130,
    width: screenWidth()
  }
});
