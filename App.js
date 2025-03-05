import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteStack } from "./src/pages/routes/RouteStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, store } from "./src/redux/store";
import SplashScreen from "./src/pages/splash";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <SafeAreaProvider>
          <RouteStack />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
