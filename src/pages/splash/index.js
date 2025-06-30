import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Safewrapper from "../../shared/Safewrapper";

const SplashScreen = () => {
  const fullText = "Akshify";
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText(prev => {
        if (indexRef.current < fullText.length) {
          const nextChar = fullText[indexRef.current];
          indexRef.current += 1;
          return prev + nextChar;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 100); // 100ms per letter

    return () => clearInterval(interval); // clean up
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
