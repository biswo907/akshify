import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 375;

const scale = size => width / BASE_WIDTH * size;

export const fontPixel = size => {
  return PixelRatio.roundToNearestPixel(scale(size));
};

export const marginPixel = size => {
  return PixelRatio.roundToNearestPixel(scale(size));
};

export const paddingPixel = size => {
  return PixelRatio.roundToNearestPixel(scale(size));
};

export const screenWidth = () => {
  return width;
};

export const screenHeight = () => {
  return height;
};
