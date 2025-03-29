import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Safewrapper from "../shared/Safewrapper";
import AppHeader from "../shared/Header";
import languages from "../constants/LanguageConstants";

const LanguageScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const t = languages[selectedLanguage]; // Get the selected language content

  return (
    <Safewrapper>
      {/* Header */}
      <AppHeader
        title={t.languageSelection}
        handleBack={() => navigation.goBack()}
      />

      {/* Language Switcher in Top-Right */}
      <View style={styles.languageSwitcher}>
        {["en", "hi", "od"].map(lang =>
          <TouchableOpacity
            key={lang}
            style={[
              styles.langButton,
              {
                backgroundColor: selectedLanguage === lang ? "#007BFF" : "#DDD"
              }
            ]}
            onPress={() => setSelectedLanguage(lang)}
          >
            <Text
              style={{ color: selectedLanguage === lang ? "#FFF" : "#000" }}
            >
              {lang.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Topics List */}
      <FlatList
        data={t.topics}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>}
        showsVerticalScrollIndicator={false}
      />
    </Safewrapper>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  languageSwitcher: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
    paddingHorizontal: 16
  },
  langButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5
  },
  card: {
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5
  }
});
