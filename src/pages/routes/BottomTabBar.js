import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Profile from "../Profile";
import CreateTask from "../Task/CreateTask";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set icon name based on the route
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato", // Active icon color
        tabBarInactiveTintColor: "gray", // Inactive icon color
        tabBarStyle: {
          position: "absolute", // Optional: to position the tab bar absolutely
          bottom: 0,
          left: 0,
          right: 0,
          height: 60, // Set the height of the tab bar
          borderTopLeftRadius: 20, // Top left border radius
          borderTopRightRadius: 20, // Top right border radius
          borderTopWidth: 0, // Remove top border
          backgroundColor: "white", // Background color of the tab bar
          elevation: 5, // Shadow for Android
          shadowColor: "#000", // Shadow color for iOS
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.1, // Shadow opacity
          shadowRadius: 4, // Shadow radius
          alignItems: "center", // Center items vertically
          justifyContent: "center",
          alignContent: "center"
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={CreateTask} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({});
