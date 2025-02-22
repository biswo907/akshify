import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouterConstant } from "../constants/RouterConstant";

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      navigation.replace(RouterConstant.SIGNUP);
    } catch (error) {
      Alert.alert("Error", "Something went wrong during logout!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Avatar */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Biswajit Dash</Text>
        <Text style={styles.userEmail}>biswajitdash907@gmail.com</Text>
      </View>

      {/* My Tasks Button */}
      <TouchableOpacity
        style={styles.taskButton}
        onPress={() => navigation.navigate(RouterConstant.MYTASK)}
      >
        <Text style={styles.taskButtonText}>My Tasks</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingHorizontal: 20
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333"
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 5
  },
  taskButton: {
    backgroundColor: "#5F33E1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    width: "100%",
    alignItems: "center"
  },
  taskButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});
