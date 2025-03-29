import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  backgroundColor = "#fff",
  color = "white",
  maxLength
}) => {
  return (
    <View style={[styles.inputContainer, { backgroundColor }]}>
      <TextInput
        style={[styles.input, { color: color }]}
        placeholder={placeholder}
        placeholderTextColor={color}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10
  },
  input: {
    fontSize: 16,
    color: "#333"
  }
});
