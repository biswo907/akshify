import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps
} from "react-native";
import React from "react";
// import { appColor } from "../../../../constants/ColorString";

const CustomInput = ({
  label,
  placeholder = "Enter",
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  inputStyle,
  containerStyle,
  showLabel = true,
  editable,
  onBlur,
  maxLength,
  errorMessage,
  ...rest
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {showLabel &&
        <Text style={styles.label}>
          {label}
        </Text>}
      <View
        style={[
          styles.inputContainer
          // { borderColor: errorMessage ? "red" : "#F5F5F7" }
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          editable={editable}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest} // pass any other props
        />
      </View>
      {errorMessage &&
        <Text style={{ color: "red" }}>
          {errorMessage}
        </Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
    fontSize: 14,
    color: "white"
  },
  inputContainer: {
    backgroundColor: "#FBFBFB",
    borderWidth: 2,
    borderColor: "#F5F5F7",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  input: {
    color: "#000",
    fontSize: 16,
    padding: 2
  }
});
