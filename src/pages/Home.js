import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouterConstant } from "../constants/RouterConstant";

const Home = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#5F33E1", "#9A66E8"]} style={styles.container}>
      <Text style={styles.title}>Welcome to Task Manager</Text>
      <Text style={styles.subtitle}>
        Manage your tasks efficiently & stay productive
      </Text>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: "#EEE",
    textAlign: "center",
    marginBottom: 30
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5F33E1"
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff"
  },
  secondaryButtonText: {
    color: "#fff"
  }
});
