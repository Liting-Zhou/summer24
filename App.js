// rnf to generate a template
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
