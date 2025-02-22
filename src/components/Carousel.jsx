import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LogBox
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { screenWidth } from "../utils/dimensions";

const Carousel = ({
  carouselData,
  height,
  animation = false,
  resize = "contain"
}) => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll

  useEffect(() => {
    console.log("Carousel Data-----", carouselData);

    let interval = setInterval(() => {
      if (!carouselData?.length) {
        console.log("Carousel Data", carouselData);
        return;
      }
      if (animation) {
        if (activeIndex === carouselData?.length - 1) {
          flatlistRef.current.scrollToIndex({
            index: 0,
            animation: true
          });
        } else {
          flatlistRef.current.scrollToIndex({
            index: activeIndex + 1,
            animation: true
          });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth(),
    offset: screenWidth() * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index
  });

  //  Display Images // UI
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ height: height ? height : 30 }}>
        <Image
          resizeMode={resize}
          source={{ uri: item.image ? item.image : item.url }}
          style={{ height: "100%", width: screenWidth() }}
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Get the index of current active item

    const index = scrollPosition / screenWidth();

    // Update the index

    setActiveIndex(Math.round(index));
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData?.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#1185E0",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "gray",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6
            }}
          ></View>
        );
      }
    });
  };

  return (
    <View style={{ height: height ? height : 100, backgroundColor: "red" }}>
      <FlatList
        data={carouselData ? carouselData : []}
        ref={animation ? flatlistRef : null}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 5,
          width: screenWidth()
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
