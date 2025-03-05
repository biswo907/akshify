import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native"; // Empty View for 2-sec delay
import SplashScreen from "../splash";
import { RouterConstant } from "../../constants/RouterConstant";
import SignupScreen from "../auth/Signup";
import Home from "../Home";
import BottomTabBar from "./BottomTabBar";
import MyTasks from "../Task/MyTasks";
import Policy from "../Policy";
import Notification from "../Notification";
import Help from "../Help";
import About from "../About";
import SigninScreen from "../auth/Login";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export const RouteStack = () => {
  const [showEmptyScreen, setShowEmptyScreen] = useState(true);

  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    // Show empty screen for 2 seconds
    setTimeout(() => {
      setShowEmptyScreen(false);
    }, 1000);
  }, []);

  if (showEmptyScreen) {
    return <SplashScreen />;
  }

  if (isLogin === null) {
    return <SplashScreen />; // Optional loading screen while checking login
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? "Home" : RouterConstant.SIGNUP}
      >
        <Stack.Screen
          name={"Home"}
          component={BottomTabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.SIGNUP}
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.SIGNIN}
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.SPLASH}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.MYTASK}
          component={MyTasks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.POLICY}
          component={Policy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.NOTIFICATION}
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.HELP}
          component={Help}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouterConstant.ABOUT}
          component={About}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
