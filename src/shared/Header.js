import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const AppHeader = ({ handleBack, title, color = "white", isBackDisable }) => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    if (handleBack) {
      handleBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      {!isBackDisable &&
        <Pressable onPress={goBackHandler} style={styles.backButton}>
          <AntDesign name="leftcircle" size={24} color={color} />
        </Pressable>}
      <Text
        style={[
          styles.headerTitle,
          { color },
          {
            textAlign: "center",
            width: isBackDisable && "100%",
            marginTop: isBackDisable && 12
          }
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: "transparent"
    // marginTop: 10
  },
  backButton: {
    padding: 8
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12
  }
});
