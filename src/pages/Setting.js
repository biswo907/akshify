import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Safewrapper from "../shared/Safewrapper";
import AppHeader from "../shared/Header";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather
} from "@expo/vector-icons";

const settingsOptions = [
  {
    id: "1",
    title: "Account Settings",
    icon: <AntDesign name="user" size={20} color="#007BFF" />
  },
  {
    id: "2",
    title: "Notification Settings",
    icon: <Ionicons name="notifications-outline" size={20} color="#007BFF" />
  },
  {
    id: "3",
    title: "Privacy Policy",
    icon: <MaterialIcons name="privacy-tip" size={20} color="#007BFF" />
  },
  {
    id: "4",
    title: "Security & Password",
    icon: <Feather name="lock" size={20} color="#007BFF" />
  },
  {
    id: "5",
    title: "App Updates",
    icon: <Ionicons name="cloud-download-outline" size={20} color="#007BFF" />
  },
  {
    id: "6",
    title: "Help & Support",
    icon: <Feather name="help-circle" size={20} color="#007BFF" />
  },
  {
    id: "7",
    title: "About Us",
    icon: <AntDesign name="infocirlceo" size={20} color="#007BFF" />
  },
  {
    id: "8",
    title: "Terms & Conditions",
    icon: <MaterialIcons name="article" size={20} color="#007BFF" />
  }
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <Safewrapper>
      {/* Header */}
      <AppHeader title="Settings" handleBack={() => navigation.goBack()} />

      {/* Settings List */}
      <FlatList
        data={settingsOptions}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <Text style={[styles.cardText, { color: item.color || "#333" }]}>
              {item.title}
            </Text>
          </TouchableOpacity>}
      />
    </Safewrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 10
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
