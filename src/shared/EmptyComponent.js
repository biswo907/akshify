import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyComponent = ({
  title = "No Items Available",
  description = "It looks like there's nothing here yet."
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyBox}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
    // marginTop: 50,
  },
  emptyBox: {
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#5F33E1",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(95, 51, 225, 0.1)",
    top: -70
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF5350",
    marginBottom: 8,
    textAlign: "center"
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center"
  }
});
