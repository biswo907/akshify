import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../constants/RouterConstant";

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn"); // Clear login status from AsyncStorage
      navigation.replace(RouterConstant.SIGNUP); // Navigate to the Login screen
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle the error (e.g., display an alert to the user)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />{" "}
      {/* Add a logout button */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 20 // Add some padding
  }
});
