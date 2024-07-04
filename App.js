import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";

export default function App() {
  const appName = "Summer 2024 class";
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Header name={appName}>
        <Text>children1</Text>
        <Text>children2</Text>
      </Header>
      <TextInput
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder="Enter something here..."
      />
      <Text>This is what you entered: {text}</Text>
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
