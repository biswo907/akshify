import { ToastAndroid, Platform, Alert } from "react-native";

export const showToast = (message, duration = "short") => {
  if (Platform.OS === "android") {
    const toastDuration =
      duration === "long" ? ToastAndroid.LONG : ToastAndroid.SHORT;
    ToastAndroid.show(message, toastDuration);
  } else {
    Alert.alert("Notice", message, [{ text: "OK" }]);
  }
};
