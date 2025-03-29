import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Safewrapper from "../shared/Safewrapper";
import aboutData from "../../assets/data/about.json"; // Import JSON
import AppHeader from "../shared/Header";

const About = () => {
  return (
    <Safewrapper>
      <AppHeader title={"About"} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {aboutData.title}
        </Text>
        <Text style={styles.description}>
          {aboutData.description}
        </Text>
        {aboutData.sections.map((section, index) =>
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {section.title}
            </Text>
            <Text style={styles.sectionContent}>
              {section.content}
            </Text>
          </View>
        )}
      </ScrollView>
    </Safewrapper>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5
  },
  sectionContent: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 22
  }
});
