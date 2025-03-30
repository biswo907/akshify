import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import EmployeCard from "./component/EmployeeCard";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";

const employees = [
  { name: "John Doe", task: "Developing API endpoints" },
  { name: "Jane Smith", task: "UI/UX Design" },
  { name: "Michael Johnson", task: "Database Management" },
  { name: "Emily Davis", task: "Testing and QA" },
  { name: "John Doe", task: "Developing API endpoints" },
  { name: "Jane Smith", task: "UI/UX Design" },
  { name: "Michael Johnson", task: "Database Management" },
  { name: "Emily Davis", task: "Testing and QA" }
];

const Employees = () => {
  const navigation = useNavigation();
  const handleDetails = () => {
    navigation.navigate(RouterConstant.TASKDETAILS);
  };
  return (
    <Safewrapper>
      <AppHeader title={"Employees"} />
      <ScrollView contentContainerStyle={styles.container}>
        {employees.map((employee, index) =>
          <EmployeCard key={index} item={employee} onPress={handleDetails} />
        )}
      </ScrollView>
    </Safewrapper>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    backgroundColor: "#2C2C2C",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  task: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 5
  }
});
