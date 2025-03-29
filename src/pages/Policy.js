import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Safewrapper from "../shared/Safewrapper";
import policyData from "../../assets/data/policy.json"; // Import JSON
import AppHeader from "../shared/Header";

const Policy = () => {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    setPolicy(policyData); // Load policy data
  }, []);

  return (
    <Safewrapper colors={["#3E1E68", "#2D2F7F"]}> 
      <AppHeader title={policy?.title || "Policy"} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {policy ? (
          <>
            <Text style={styles.title}>{policy.title}</Text>
            <Text style={styles.updatedDate}>{policy.updatedDate}</Text>

            {policy.sections.map((section, index) => (
              <View key={index}>
                <Text style={styles.subtitle}>{section.title}</Text>
                {section.content.map((text, i) => (
                  <Text key={i} style={styles.paragraph}>
                    {text}
                  </Text>
                ))}
              </View>
            ))}

            <Text style={styles.note}>{policy.footerNote}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
    </Safewrapper>
  );
};

export default Policy;

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    marginBottom: 5,
  },
  updatedDate: {
    fontSize: 14,
    color: "#E0E0E0", // Light Grayish-White
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF", // White text
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: "#F5F5F5", // Slightly dimmed white
    lineHeight: 22,
    marginBottom: 5,
    fontWeight:'200'
  },
  note: {
    fontSize: 14,
    color: "#BBBBBB", // Soft white-gray
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
  },
});
