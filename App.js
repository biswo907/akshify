import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteStack } from "./src/pages/routes/RouteStack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <RouteStack />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
