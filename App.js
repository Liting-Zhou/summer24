import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "Summer 2024 class";
  const [receivedText, setReceivedText] = useState("");
  const handleInputData = (data) => {
    // console.log("call back function");
    // console.log(data);
    setReceivedText(data);
  };

  return (
    <View style={styles.container}>
      <Header name={appName}>
        {/* <Text>children1</Text> */}
        {/* <Text>children2</Text> */}
      </Header>
      <Input inputHandler={handleInputData} />
      <Text>The message you entered: {receivedText}</Text>
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
