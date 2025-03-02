import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Safewrapper from "../../shared/Safewrapper";

const SplashScreen = () => {
  const fullText = "Akshify";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed (200ms per letter)

    return () => clearInterval(interval);
  }, []);

  return (
    <Safewrapper>
      <View style={styles.container}>
        <Text style={styles.title}>
          {displayedText}
        </Text>
      </View>
    </Safewrapper>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8
  }
});
