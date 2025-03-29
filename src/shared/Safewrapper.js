import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";

const Safewrapper = ({
  children,
  colors = ["#5F33E1", "#9A66E8"],
  statusBarStyle = "light"
}) => {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <StatusBar translucent style={statusBarStyle} />
      <SafeAreaView
        style={[
          styles.safeArea,
          { paddingTop: RNStatusBar.currentHeight || 0 }
        ]}
      >
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Safewrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1
  }
});
