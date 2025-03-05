import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({
  onPress,
  title,
  colors = ["#5F33E1", "#A655E3", "#EDE7FF"],
  isLoading = false,
  textColor = "white"
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        >
          {isLoading
            ? <ActivityIndicator size="small" color={textColor} />
            : <Text style={[styles.buttonText, { color: textColor }]}>
                {title}
              </Text>}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%"
  },
  linearGradient: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    opacity: 0.9 // Slight transparency for a smooth look
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
