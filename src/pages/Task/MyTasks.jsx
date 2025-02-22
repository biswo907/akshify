import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Carousel from "../../components/Carousel";

const MyTasks = () => {
  const data = [
    {
      image:
        "https://cdn.pixabay.com/photo/2024/12/09/05/57/girl-9254216_640.jpg"
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2024/12/09/05/57/girl-9254216_640.jpg"
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2024/12/09/05/57/girl-9254216_640.jpg"
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#303030" }}>
      <Carousel carouselData={data} height={340} animation={true} /> : ""
    </View>
  );
};

export default MyTasks;

const styles = StyleSheet.create({});
