/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar
} from "react-native";
// import {userAvtar} from '../../utils/Images';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { RouterConstant } from "../constants/RouterConstant";
import ConfirmationModal from "../shared/ConfirmationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/reducers/authSlice";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch =useDispatch()
  const { user } = useSelector(state => state.auth);


  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = async () => {
    dispatch(logOutUser())
    navigation.replace(RouterConstant.SIGNUP);
  };

  const settingsData = [
    {
      id: 1,
      title: "My Tasks",
      subTitle: "Organize and track tasks",
      icon: "user",
      route: RouterConstant.MYTASK
    },
    {
      id: 2,
      title: "Settings",
      subTitle: "Manage your app settings",
      icon: "setting",
      route: RouterConstant.SETTINGS
    },
    { id: 3, title: "Theme", subTitle: "Change your app theme", icon: "skin",route: RouterConstant.THEME },
    {
      id: 4,
      title: "Language",
      subTitle: "Change app language",
      icon: "earth",
      route: RouterConstant.LANGUAGE
    },
    {
      id: 5,
      title: "Notifications",
      subTitle: "Manage notifications",
      icon: "notification",
      route: RouterConstant.NOTIFICATION
    },
    {
      id: 6,
      title: "Privacy & Security",
      subTitle: "Manage privacy settings",
      icon: "lock",
      route: RouterConstant.POLICY
    },
    {
      id: 7,
      title: "Help & Support",
      subTitle: "Get help",
      icon: "questioncircleo",
      route: RouterConstant.HELP
    },
    {
      id: 8,
      title: "About",
      subTitle: "Learn more",
      icon: "infocirlceo",
      route: RouterConstant.ABOUT
    },
    {
      id: 9,
      title: "Logout",
      subTitle: "Sign out of your account",
      icon: "logout"
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />
      <LinearGradient
        colors={["#5F33E1", "#9A66E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: 10,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center"
            }}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-846.jpg?ga=GA1.1.29524733.1691785299&semt=ais_hybrid"
              }}
              style={styles.userImage}
            />

            <View>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                Hello !!
              </Text>
              <Text style={{ color: "white", fontSize: 14, fontWeight: "400" }}>
                {user?.full_name}
              </Text>
            </View>
          </View>
          <View>
            <AntDesign name="edit" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <View
          style={{
            marginBottom: 80,
            marginTop: 20,
            marginHorizontal: 20,
            backgroundColor: "white",
            borderRadius: 20,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 5
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={settingsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                // disabled={!item?.route}
                style={{
                  padding: 15,
                  borderBottomWidth: index === settingsData.length - 1 ? 0 : 1,
                  borderBottomColor: "#f0f0f0"
                }}
                onPress={() =>
                  item.title === "Logout"
                    ? setIsVisible(true)
                    : item?.route && navigation.navigate(item.route)
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      width: "80%"
                    }}
                  >
                    <AntDesign name={item?.icon} size={24} color="#4c669f" />
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {item.title}
                        {}
                      </Text>
                      <Text style={{ fontSize: 14, color: "#777" }}>
                        {item.subTitle}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <AntDesign name="rightcircle" size={16} color="#9A66E8" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <ConfirmationModal
        isVisible={isVisible}
        handleCancel={() => setIsVisible(false)}
        handleConfirm={handleLogout}
        title="Are you Sure Want to Logout"
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#4c669f"
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10
  },
  email: {
    fontSize: 14,
    color: "#777"
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  infoText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#4c669f"
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  syncButton: {
    flexDirection: "row",
    backgroundColor: "#4c669f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
    marginBottom: 10
  },
  syncButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    justifyContent: "center"
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#4c669f"
  }
});
