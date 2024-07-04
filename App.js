import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";

export default function App() {
  const appName = "Summer 2024 class";

  return (
    <View style={styles.container}>
      <Header name={appName}>
        <Text>children1</Text>
        <Text>children2</Text>
      </Header>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
