import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName}>
          {/* <Text>children1</Text> */}
          {/* <Text>children2</Text> */}
        </Header>
        <View style={styles.buttonStyle}>
          <Button
            title="Add a goal"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </View>
      <Input inputHandler={handleInputData} isModalVisible={modalVisible} />
      <View style={styles.bottomContainer}>
        <Text style={styles.textStyle}>{receivedText}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "red",
  },
  buttonStyle: {
    width: "30%",
    // marginTop: 5,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
