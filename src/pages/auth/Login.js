import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RouterConstant } from "../../constants/RouterConstant";
import CustomButton from "../../components/CustomButton";
import { showToast } from "../../utils/Toast";
import Icon from "react-native-vector-icons/Feather"; // Import icon
import { StatusBar } from "expo-status-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useLoginMutation } from "../../redux/services/authService";
import { setIsLogin, setToken, setUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

GoogleSignin.configure({
  webClientId: `716771364474-1q7n55h7phgrej82ionuiehi2mnt4j5i.apps.googleusercontent.com`,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: true
});

const SigninScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();


  const resetAndNavigate = (newPath) => {
    navigation.reset({
      index: 0,
      routes: [{ name: typeof newPath === 'string' ? newPath : newPath.pathname, params: typeof newPath === 'object' ? newPath.params : {} }],
    });
  };
  

  const handleSignup = async () => {
    if (!username || !password) {
      showToast("Username and password are required.");
      return;
    }
    try {
      const response = await login({
        email: username,
        password: password
      }).unwrap();
      dispatch(setIsLogin(true));
      dispatch(setUser(response?.user));
      dispatch(setToken(response?.token));
      navigation.reset({
        index: 0, 
        routes: [{ name: RouterConstant.TABS }], 
      });
      showToast("Login successfully!");
    } catch (error) {
      showToast(error?.data?.message);
    }
  };

  const image = {
    uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGTAKuHtTIBATCYZ_VkurIx1bN9rE3Sr9xGw&s`
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <StatusBar translucent />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Login</Text>

            {/* Username Input */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />

            {/* Password Input with Toggle */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={14}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <CustomButton title={"Login"} onPress={handleSignup} />

            {/* <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              /> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  passwordInput: {
    flex: 1,
    height: 40
  },
  eyeIcon: {
    padding: 8
  },
  googleButton: {
    width: "100%",
    height: 48,
    marginTop: 20
  }
});
