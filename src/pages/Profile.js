import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../constants/RouterConstant";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(RouterConstant.MYTASK)}
      >
        <Text>Profile</Text>
        <Button title="Logout" onPress={handleLogout} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Ensures background color consistency
    paddingHorizontal: 16 // Optional: Adds padding for better spacing
  }
});
