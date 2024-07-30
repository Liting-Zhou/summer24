// rnfs to generate a template
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button } from "react-native";
import React, { useState } from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
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
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Log in",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Goals",
          }}
        />
        <Stack.Screen name="Details" component={GoalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
