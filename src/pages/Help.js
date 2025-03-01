import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import Safewrapper from "../shared/Safewrapper";
import helpData from "../../assets/data/help.json"; // Import JSON data
import { AntDesign } from "@expo/vector-icons";
import AppHeader from "../shared/Header";

const Help = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = index => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Safewrapper colors={["#004d40", "#001f3f"]}>
      <AppHeader title="Help & Support" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {helpData.title}
        </Text>
        <Text style={styles.description}>
          {helpData.description}
        </Text>

        {helpData.faqs.map((faq, index) =>
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity
              onPress={() => toggleExpand(index)}
              style={styles.faqHeader}
            >
              <Text style={styles.question}>
                {faq.question}
              </Text>
              <AntDesign
                name={expanded === index ? "minus" : "plus"}
                size={18}
                color="white"
              />
            </TouchableOpacity>
            {expanded === index &&
              <Text style={styles.answer}>
                {faq.answer}
              </Text>}
          </View>
        )}
      </ScrollView>
    </Safewrapper>
  );
};

export default Help;

const styles = StyleSheet.create({
  content: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 20
  },
  faqContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 10
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    width: "90%"
  },
  answer: {
    fontSize: 14,
    color: "#F5F5F5",
    marginTop: 5,
    lineHeight: 22
  }
});
