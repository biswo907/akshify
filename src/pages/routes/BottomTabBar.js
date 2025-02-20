import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Dummy1 from "../Dummy1";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="dummy" component={Dummy1} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({});
