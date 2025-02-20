import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/pages/splash";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent login
import { RouterConstant } from "./src/constants/RouterConstant";
import SignupScreen from "./src/pages/auth/Signup";
import Home from "./src/pages/Home";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
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
        initialRouteName={
          isLoggedIn ? RouterConstant.HOME : RouterConstant.SIGNUP
        }
      >
        <Stack.Screen name={RouterConstant.HOME} component={Home} />
        <Stack.Screen name={RouterConstant.SIGNUP} component={SignupScreen} />
        <Stack.Screen name={RouterConstant.SPLASH} component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
