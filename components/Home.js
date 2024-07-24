// rnf to generate a template
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { db } from "../firebase/firebaseSetup";
import { writeToDB, deleteFromDB } from "../firebase/firebaseHelper";
import { onSnapshot, collection } from "firebase/firestore";

export default function Home({ navigation }) {
  const appName = "Summer 2024 class";
  // default goals for testing
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "goals"), (querySnapshot) => {
      let newGoals = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapShot) => {
          newGoals.push({ ...docSnapShot.data().data, id: docSnapShot.id });
        });
      }
      setGoals(newGoals);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleInputData = (data) => {
    // define a new object {text:.., id:..}
    const newGoal = { text: data };
    // call writeToDB function from firebaseHelper.js and pass the new goal
    writeToDB(newGoal, "goals");
    setModalVisible(false);
  };

  const handleCancelInput = () => {
    setModalVisible(false);
  };

  const handleDeleteGoal = (deletedId) => {
    // console.log("deleteID", deletedId);
    deleteFromDB(deletedId, "goals");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName}></Header>
        <PressableButton
          pressedFunction={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonTextStyle}>Add a goal</Text>
        </PressableButton>
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
              return (
                <GoalItem
                  goal={item}
                  deleteHandler={() => handleDeleteGoal(item.id)}
                />
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
  buttonTextStyle: {
    color: "blue",
    fontSize: 16,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "lightblue",
    padding: 20,
  },
});
