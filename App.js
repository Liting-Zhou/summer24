// rnfs to generate a template
import { Alert, StyleSheet, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Notifications from "expo-notifications";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import MapComponent from "./components/MapComponent";
import PressableButton from "./components/PressableButton";
import GoalDetails from "./components/GoalDetails";

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("App.js 35, notification", notification);
      }
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        //navigate to the url
        const url = response.notification.request.content.data.url;
        if (url) {
          Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
          );
        }
      }
    );
    return () => subscription.remove();
  }, []);

  //listen for user state changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  }, []);

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const AuthStack = (
    <>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Sign up" }}
      />
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            title: "Goals",
            headerRight: () => {
              return (
                <PressableButton
                  pressedFunction={() => navigation.navigate("Profile")}
                >
                  <AntDesign name="profile" size={24} color="black" />
                </PressableButton>
              );
            },
          };
        }}
      />
      <Stack.Screen name="Details" component={GoalDetails} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => {
            return (
              <PressableButton pressedFunction={handleSignout}>
                <AntDesign name="logout" size={24} color="black" />
              </PressableButton>
            );
          },
        }}
      />
      <Stack.Screen name="Map" component={MapComponent} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {isUserAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
