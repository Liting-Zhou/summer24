// rnf to generate a template
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "Summer 2024 class";
  // const [receivedText, setReceivedText] = useState("");
  const [goals, setGoals] = useState([
    { text: "Finish the course", id: Math.random() },
    { text: "Finish the course", id: Math.random() },
    { text: "Finish the course", id: Math.random() },
    { text: "Finish the course", id: Math.random() },
    { text: "Learn React Native", id: Math.random() },
    { text: "Learn React Native", id: Math.random() },
    { text: "Learn React Native", id: Math.random() },
    { text: "Learn React Native", id: Math.random() },
    { text: "Build a project", id: Math.random() },
    { text: "Build a project", id: Math.random() },
    { text: "Build a project", id: Math.random() },
    { text: "Build a project", id: Math.random() },
    { text: "Get a job", id: Math.random() },
    { text: "Get a job", id: Math.random() },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleInputData = (data) => {
    //define a new object {text:.., id:..}
    const newGoal = { text: data, id: Math.random() };
    // use updater function to update the state
    setGoals((currentGoals) => {
      return [...currentGoals, newGoal];
    });
    // setReceivedText(data);
    setModalVisible(false);
  };

  const handleCancelInput = () => {
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
      <Input
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        cancelHandler={handleCancelInput}
      />
      <View style={styles.bottomContainer}>
        {goals.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Please add a goal</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={goals}
            renderItem={(itemData) => {
              return (
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>{itemData.item.text}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "lightyellow",
    borderRadius: 5,
    marginVertical: 5,
  },
  textStyle: {
    color: "red",
    padding: 10,
  },
  buttonStyle: {
    width: "30%",
    marginTop: 10,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "lightblue",
    // alignItems: "center",
    padding: 20,
  },
});
