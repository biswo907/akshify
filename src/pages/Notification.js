import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Safewrapper from "../shared/Safewrapper";
import AppHeader from "../shared/Header";

const notifications = [
  {
    id: "1",
    title: "New Message",
    description: "You have a new message from John.",
    time: "2m ago"
  },
  {
    id: "2",
    title: "App Update",
    description: "A new version is available. Update now!",
    time: "10m ago"
  },
  {
    id: "3",
    title: "Reminder",
    description: "Your appointment is scheduled for tomorrow at 10 AM.",
    time: "1h ago"
  },
  {
    id: "4",
    title: "Payment Received",
    description: "You received $50 from PayPal.",
    time: "2h ago"
  },
  {
    id: "5",
    title: "Offer Alert!",
    description: "Exclusive 50% discount for you. Claim now!",
    time: "5h ago"
  }
];

const NotificationScreen = () => {
  const navigation = useNavigation();

  return (
    <Safewrapper>
      {/* Header */}
      <AppHeader
        title={"Notifications"}
        handleBack={() => {
          navigation.goBack();
        }}
      />

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Safewrapper>
  );
};

export default NotificationScreen;

const NotificationCard = ({ item }) =>
  <View style={styles.notificationCard}>
    <View style={styles.notificationContent}>
      <Text style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.description}>
        {item.description}
      </Text>
      <Text style={styles.time}>
        {item.time}
      </Text>
    </View>
    <AntDesign name="rightcircle" size={16} color="#9A66E8" />
  </View>;

const styles = StyleSheet.create({
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 }
  },
  notificationContent: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4
  },
  time: {
    fontSize: 12,
    color: "#888"
  }
});
