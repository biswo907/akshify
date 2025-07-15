import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetDeletedTaskQuery } from "../../redux/services/taskService";
import Safewrapper from "../../shared/Safewrapper";
import AppHeader from "../../shared/Header";
import TaskCard from "./component/TaskCard";
import EmptyComponent from "../../shared/EmptyComponent";

const DeletedTask = () => {
  const { data, isLoading, refetch } = useGetDeletedTaskQuery();
  console.log("DELETE",data);
  
  return (
       <Safewrapper>
      <AppHeader title="My Deleted Tasks" />
      {
        isLoading ?
         <View
                  style={{
                    height: "90%",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <ActivityIndicator color={"white"} size={"large"} />
                </View>
                :

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.tasks || []}
          keyExtractor={(item) => item._id}
          contentContainerStyle={
            (data?.tasks?.length || 0) === 0 ? styles.emptyListContainer : null
          }
          renderItem={({ item }) => (
            <TaskCard
              // disbled={
              //   TaskStatus?.COMPLETED === item?.status ||
              //   TaskStatus?.EXPIRED === item?.status
              // }
              item={item}
            />
          )}
          ListEmptyComponent={
            <EmptyComponent
              title="No Deleted Tasks Available!"
              description="Sorry You have Delete any Task Yet !!"
            />
          }
        />

        
      </View>
      }

    </Safewrapper>
  );
};

export default DeletedTask;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
