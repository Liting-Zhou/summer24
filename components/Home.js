// rnf to generate a template
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home() {
  const appName = "Summer 2024 class";
  // default goals for testing
  const [goals, setGoals] = useState([
    { text: "Finish the course 1", id: Math.random() },
    { text: "Finish the course 2", id: Math.random() },
    { text: "Finish the course 3", id: Math.random() },
    { text: "Finish the course 4", id: Math.random() },
    { text: "Learn React Native 1", id: Math.random() },
    { text: "Learn React Native 2", id: Math.random() },
    { text: "Learn React Native 3", id: Math.random() },
    { text: "Build a project 1", id: Math.random() },
    { text: "Build a project 2", id: Math.random() },
    { text: "Build a project 3", id: Math.random() },
    { text: "Build a project 4", id: Math.random() },
    { text: "Get a job 1", id: Math.random() },
    { text: "Get a job 2", id: Math.random() },
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

  const handleDeleteGoal = (deletedId) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== deletedId);
    });
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
            renderItem={({ item }) => {
              return <GoalItem goal={item} deleteHandler={handleDeleteGoal} />;
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
    padding: 20,
  },
});
