import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent login
import React from "react";
import SplashScreen from "../splash";
import { RouterConstant } from "../../constants/RouterConstant";
import SignupScreen from "../auth/Signup";
import Home from "../Home";
import BottomTabBar from "./BottomTabBar";
import MyTasks from "../Task/MyTasks";

const Stack = createNativeStackNavigator();

export const RouteStack = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null); // Initialize as null

  React.useEffect(() => {
    // Check for stored login status on app startup
    const checkLoginStatus = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem("isLoggedIn");
        if (storedLogin !== null) {
          setIsLoggedIn(JSON.parse(storedLogin)); // Parse stored boolean
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false); // Default to false on error
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return <SplashScreen />; // Or a loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Home" : RouterConstant.SIGNUP}
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
        <Stack.Screen name={RouterConstant.SPLASH} component={SplashScreen} />
        <Stack.Screen name={RouterConstant.MYTASK} component={MyTasks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
