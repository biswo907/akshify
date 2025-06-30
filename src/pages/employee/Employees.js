import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import EmployeCard from "./component/EmployeeCard";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import { useEmployeeListQuery, useToggleEmployeeStatusMutation } from "../../redux/services/apiService";
import { showToast } from "../../utils/Toast";

const employees = [
  {
    name: "Biswajit Dash",
    task: "Developing API endpoints"
  }
];

const Employees = () => {
  const navigation = useNavigation();

  const { data, isLoading, isError, error,refetch } = useEmployeeListQuery();

const [toggleEmployeeStatus, { isLoading:isStatusLoading }] = useToggleEmployeeStatusMutation();  

  const handleDetails = () => {
    navigation.navigate(RouterConstant.TASKDETAILS);
  };

  const handleToggleStatus = async (employee) => {
  try {
    await toggleEmployeeStatus({
      userId: employee._id,
      is_active: !employee.is_active,
    }).unwrap();
    showToast('Status updated successfully')
    refetch()

  } catch (err) {
    showToast(err || 'Status updated successfully')
  }
};
  

  const renderEmployee = ({ item }) => (
    <EmployeCard
    disabled={!item.is_active}
  item={item}
  // onPress={() => navigation.navigate("EmployeeDetail", { id: employee._id })}
  
  onToggle={(item) => {
    handleToggleStatus(item);
    console.log('toggleEmployeeStatus',{ userId: item._id, is_active: !item.is_active });
    
  }}
/>

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
