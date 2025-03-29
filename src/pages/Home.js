import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Safewrapper from "../shared/Safewrapper";

const Home = () => {
  const navigation = useNavigation();

  return (
    <Safewrapper>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Welcome to MyApp</Text> */}
        {/* <Text style={styles.subtitle}>Explore and experience the best!</Text> */}
      </View>
    </Safewrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#E0D4FC",
    marginBottom: 30
  }
});
