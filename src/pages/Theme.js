import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Switch,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Safewrapper from "../shared/Safewrapper";
import AppHeader from "../shared/Header";

const themes = [
  { id: "1", title: "Dark Mode", type: "toggle" },
  {
    id: "2",
    title: "Accent Color",
    type: "colors",
    options: ["#9A66E8", "#FF5733", "#28A745", "#007BFF"]
  },
  {
    id: "3",
    title: "Font Size",
    type: "fontSize",
    options: ["Small", "Medium", "Large"]
  },
  {
    id: "4",
    title: "Font Family",
    type: "fontFamily",
    options: ["Default", "Sans", "Serif", "Monospace"]
  },
  {
    id: "5",
    title: "Border Radius",
    type: "borderRadius",
    options: ["Square", "Rounded", "Extra Rounded"]
  }
];

const ThemeSettingsScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#9A66E8");
  const [fontSize, setFontSize] = useState("Medium");
  const [fontFamily, setFontFamily] = useState("Default");
  const [borderRadius, setBorderRadius] = useState("Rounded");

  return (
    <Safewrapper>
      <AppHeader
        title="Theme Settings"
        handleBack={() => navigation.goBack()}
      />

      {/* Theme Preview Box */}
      <View
        style={[
          styles.previewBox,
          {
            backgroundColor: darkMode ? "#333" : "#FFF",
            borderRadius:
              borderRadius === "Rounded"
                ? 12
                : borderRadius === "Extra Rounded" ? 20 : 0
          }
        ]}
      >
        <Text
          style={[
            styles.previewText,
            {
              color: darkMode ? "#FFF" : "#000",
              fontSize:
                fontSize === "Small" ? 14 : fontSize === "Large" ? 20 : 16,
              fontFamily:
                fontFamily === "Sans"
                  ? "sans-serif"
                  : fontFamily === "Serif"
                    ? "serif"
                    : fontFamily === "Monospace" ? "monospace" : "default"
            }
          ]}
        >
          Live Preview
        </Text>
      </View>

      <FlatList
        data={themes}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <ThemeCard
            item={item}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            borderRadius={borderRadius}
            setBorderRadius={setBorderRadius}
          />}
        showsVerticalScrollIndicator={false}
      />
    </Safewrapper>
  );
};

export default ThemeSettingsScreen;

const ThemeCard = ({
  item,
  darkMode,
  setDarkMode,
  selectedColor,
  setSelectedColor,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  borderRadius,
  setBorderRadius
}) => {
  return (
    <View
      style={[styles.card, { backgroundColor: darkMode ? "#222" : "#fff" }]}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.title, { color: darkMode ? "#FFF" : "#333" }]}>
          {item.title}
        </Text>

        {item.type === "toggle"
          ? <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
            />
          : item.type === "colors"
            ? <View style={styles.colorOptions}>
                {item.options.map(color =>
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorCircle,
                      {
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color ? "#000" : "transparent"
                      }
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                )}
              </View>
            : <View style={styles.optionButtons}>
                {item.options.map(option =>
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      {
                        borderColor:
                          (item.type === "fontSize" && fontSize === option) ||
                          (item.type === "fontFamily" &&
                            fontFamily === option) ||
                          (item.type === "borderRadius" &&
                            borderRadius === option)
                            ? selectedColor
                            : "gray"
                      }
                    ]}
                    onPress={() => {
                      if (item.type === "fontSize") setFontSize(option);
                      else if (item.type === "fontFamily")
                        setFontFamily(option);
                      else if (item.type === "borderRadius")
                        setBorderRadius(option);
                    }}
                  >
                    <Text
                      style={{
                        color:
                          (item.type === "fontSize" && fontSize === option) ||
                          (item.type === "fontFamily" &&
                            fontFamily === option) ||
                          (item.type === "borderRadius" &&
                            borderRadius === option)
                            ? selectedColor
                            : "gray"
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>}
      </View>
      <AntDesign name="rightcircle" size={16} color={selectedColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  previewBox: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2
  },
  previewText: {
    fontWeight: "bold"
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
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
  cardContent: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  colorOptions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2
  },
  optionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 2
  }
});
