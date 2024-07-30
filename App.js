// rnfs to generate a template
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";
import AntDesign from "@expo/vector-icons/AntDesign";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import PressableButton from "./components/PressableButton";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <Text>Profile</Text>
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
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerStyle: {
    //         backgroundColor: "#f4511e",
    //       },
    //       headerTintColor: "#fff",
    //       headerTitleStyle: {
    //         fontWeight: "bold",
    //       },
    //     }}
    //   >
    //     <Stack.Screen
    //       name="Signup"
    //       component={Signup}
    //       options={{
    //         title: "Sign Up",
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={Login}
    //       options={{
    //         title: "Log in",
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{
    //         title: "Goals",
    //       }}
    //     />
    //     <Stack.Screen name="Details" component={GoalDetails} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
