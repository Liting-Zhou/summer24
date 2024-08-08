// rnfs to generate a template
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";
import AntDesign from "@expo/vector-icons/AntDesign";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import MapComponent from "./components/MapComponent";
import PressableButton from "./components/PressableButton";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

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
