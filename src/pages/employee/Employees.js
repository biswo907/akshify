import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import EmployeCard from "./component/EmployeeCard";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { useEmployeeListQuery } from "../../redux/services/apiService";

const employees = [
  {
    name: "Biswajit Dash",
    task: "Developing API endpoints"
  }
];

const Employees = () => {
  const navigation = useNavigation();

  const { data, isLoading, isError, error } = useEmployeeListQuery();

  console.log("--------------ISERROR",data);
  

  const handleDetails = () => {
    navigation.navigate(RouterConstant.TASKDETAILS);
  };

  const renderEmployee = ({ item }) => (
    <EmployeCard item={item} onPress={handleDetails} />
  );

  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading employees...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Error: {error?.data?.message || "Failed to fetch employees"}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No employees found</Text>
      </View>
    );
  };

  return (
    <Safewrapper>
      <AppHeader title={"Employees"} />
      <FlatList
        contentContainerStyle={styles.container}
        data={data?.employees || []}
        renderItem={renderEmployee}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />
    </Safewrapper>
  );
};


export default Employees;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa"
  }
});
