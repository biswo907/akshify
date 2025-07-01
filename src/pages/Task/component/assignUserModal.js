import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEmployeeListQuery } from "../../../redux/services/apiService";

export const AssignUserModal = ({ visible, onClose, onConfirm }) => {
  const [tempSelectedEmployees, setTempSelectedEmployees] = useState([]);
  const [committedEmployees, setCommittedEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: employeeData,
    error: employeeError,
    isLoading: employeeLoading,
    refetch,
  } = useEmployeeListQuery();

  useEffect(() => {
    if (visible) {
      setTempSelectedEmployees(committedEmployees);
      setSearchQuery("");
      refetch();
    }
  }, [visible]);

  const handleSelectEmployee = (employeeId) => {
    setTempSelectedEmployees((prev) => {
      if (prev.includes(employeeId)) {
        return prev.filter((id) => id !== employeeId);
      } else if (prev.length < 1) {
        return [...prev, employeeId];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    setCommittedEmployees(tempSelectedEmployees);
    onConfirm(tempSelectedEmployees);
    onClose();
  };

  const filteredEmployees = useMemo(() => {
    return employeeData?.employees?.filter((emp) =>
      emp?.full_name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      emp?.username?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, employeeData]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Employee (Max 1)</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name or Username..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {employeeLoading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : employeeError ? (
          <Text style={styles.errorText}>Failed to load employee list</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredEmployees}
            ListEmptyComponent={EmptyComponent}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleSelectEmployee(item._id)}
                activeOpacity={0.9}
              >
                <View style={styles.employeeItem}>
                  <View style={{ width: "90%" }}>
                    <Text style={styles.serialLabel}>Employee - {index + 1}</Text>
                    <Text style={styles.serialValue}>{item.full_name}</Text>
                  </View>
                  {tempSelectedEmployees.includes(item._id) && (
                    <AntDesign name="check" size={24} color="green" />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity onPress={handleConfirm} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const EmptyComponent = () => (
  <View style={{ alignItems: "center", marginTop: 30 }}>
    <Text style={{ fontSize: 16, color: "#888" }}>No items found</Text>
  </View>
);

const styles = {
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  employeeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  serialLabel: { fontSize: 14, color: "#999" },
  serialValue: { fontSize: 16, fontWeight: "500" },
  doneButton: {
    marginTop: 16,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
};
