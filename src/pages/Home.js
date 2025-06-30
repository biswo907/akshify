import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Safewrapper from "../shared/Safewrapper";
import { useGetProfileQuery } from "../redux/services/apiService";
import { showToast } from "../utils/Toast";
import { useDispatch } from "react-redux";
import { setIsLogin, setToken, setUser } from "../redux/reducers/authSlice";
import { RouterConstant } from "../constants/RouterConstant";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error
  } = useGetProfileQuery();

  useEffect(() => {
    if (error?.status == 401) {
      console.log("User Logout here");
      showToast(error?.data?.message);
      dispatch(setIsLogin(false));
      dispatch(setUser(""));
      dispatch(setToken(""));
      navigation.reset({
        index: 0,
        routes: [{ name: RouterConstant.SIGNIN }]
      });
    }
  }, [error]);

  console.log("error", error);
  console.log("error....", error?.status);

  return (
    <Safewrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Akshify !!</Text>
        {/* <Text style={styles.subtitle}>Explore and experience the best!</Text> */}
      </View>
    </Safewrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#E0D4FC",
    marginBottom: 30
  }
});
