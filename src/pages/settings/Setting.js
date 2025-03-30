import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather
} from "@expo/vector-icons";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import DeleteAccountModal from "./modals/DeleteAccountModal";

const settingsOptions = [
  {
    id: 1,
    title: "Change Password",
    icon: <Feather name="lock" size={20} color="#007BFF" />
  },
  {
    id: 2,
    title: "Delete Account",
    icon: <AntDesign name="deleteuser" size={24} color="red" />
  },

  {
    id: 3,
    title: "App Updates",
    icon: <Ionicons name="cloud-download-outline" size={20} color="#007BFF" />
  }
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState({
    changePassword: false,
    deleteAccount: false
  });

  const handleModal = type => {
    if (type === 1) {
      setIsVisible(prevState => ({
        ...prevState,
        changePassword: !prevState.changePassword
      }));
    }
    if (type === 2) {
      setIsVisible(prevState => ({
        ...prevState,
        deleteAccount: !prevState.deleteAccount
      }));
    }
  };

  return (
    <Safewrapper>
      {/* Modals */}
      <ChangePasswordModal
        isVisible={isVisible.changePassword}
        onClose={() => handleModal(1)}
      />
      <DeleteAccountModal
        isVisible={isVisible.deleteAccount}
        onClose={() => handleModal(2)}
      />

      {/* Header */}
      <AppHeader title="Settings" handleBack={() => navigation.goBack()} />

      {/* Settings List */}
      <FlatList
        data={settingsOptions}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity
            onPress={() => handleModal(item?.id)}
            style={styles.card}
            activeOpacity={0.8}
          >
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
