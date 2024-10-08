// rnf to generate a template
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";

import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";

import { auth, db, storage } from "../firebase/firebaseSetup";
import { writeToDB, deleteFromDB } from "../firebase/firebaseHelper";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { verifyPermission } from "./NotificationManager";

export default function Home({ navigation }) {
  const appName = "Summer 2024 class";
  // default goals for testing
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        const hasPermission = await verifyPermission();
        console.log("Home.js 38, hasPermission", hasPermission);
        if (!hasPermission) {
          return;
        }

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
          });
        }

        const token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log("Home.js 53, token", token);
      } catch (e) {
        console.log("Error getting token", e);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        let newGoals = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnapShot) => {
            newGoals.push({ ...docSnapShot.data(), id: docSnapShot.id });
          });
        }
        setGoals(newGoals);
      },
      (e) => {
        console.log("error", e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const retrieveUploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      if (!response.ok) {
        throw new Error("upload image failed");
      }

      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      console.log("Home.js 63, uploadResult", uploadResult.metadata.fullPath);
      return uploadResult.metadata.fullPath;
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputData = async (data) => {
    let imageUri = "";
    if (data.imageUri) {
      imageUri = await retrieveUploadImage(data.imageUri);
    }

    const newGoal = {
      text: data.text,
      image: imageUri,
      owner: auth.currentUser.uid,
    };
    console.log("Home.js 84 newGoal", newGoal);
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

  const pushNotificationHandler = async () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[CAr8Q0ORbIV20KdBfAte_I]",
        title: "Push Notification",
        body: "This is a push notification",
      }),
    });
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
        <Button
          title="test push notification"
          onPress={pushNotificationHandler}
        ></Button>
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
