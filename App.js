import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "Summer 2024 class";
  const [receivedText, setReceivedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleInputData = (data) => {
    setReceivedText(data);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header name={appName}>
        {/* <Text>children1</Text> */}
        {/* <Text>children2</Text> */}
      </Header>
      <Input inputHandler={handleInputData} isModalVisible={modalVisible} />
      <Text style={styles.textStyle}>{receivedText}</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonStyle}>
        <Button
          title="Add a goal"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
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
  textStyle: {
    color: "red",
  },
  buttonStyle: {
    width: "30%",
    marginTop: 10,
  },
});
