import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  backgroundColor = "#fff",
  color = "white",
  maxLength,
  label,
  showLabel = true,
  editable,
  onBlur,
  errorMessage,
  numberOfLines,
  multiline,
  onPress,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = secureTextEntry;

  return (
    <View style={styles.inputContainer}>
      {showLabel && label
        ? <Text style={styles.label}>
            {label}
          </Text>
        : null}

      <TouchableOpacity
        style={styles.inputWrapper}
        activeOpacity={1}
        onPress={onPress}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          editable={editable}
          maxLength={maxLength}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
          placeholderTextColor="#888"
        />

        {isPasswordField &&
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={!isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>}
      </TouchableOpacity>

      {errorMessage &&
        <Text style={styles.error}>
          {errorMessage}
        </Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center"
  },
  input: {
    width: "100%",
    padding: 12,
    paddingRight: 40, // space for the eye icon
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD"
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4
  }
});
