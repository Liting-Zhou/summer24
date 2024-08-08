import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { addWarningToGoal } from "../firebase/firebaseHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  //if route.params is undefined, set goalObj to a default object
  const { goalObj } = route.params
    ? route.params
    : { goalObj: { text: "Details", image: "", owner: "" } };
  const [textColor, setTextColor] = useState("black");
  const [headerTitle, setHeaderTitle] = useState(goalObj.text);
  const [imageURL, setImageURL] = useState("");
  console.log("GoalDetails.js 16, goalObj", goalObj);

  useEffect(() => {
    const getImageURL = async () => {
      if (route.params) {
        const url = await getDownloadURL(
          ref(storage, route.params.goalObj.image)
        );
        console.log("GoalDetails.js 24, url", url);
        setImageURL(url);
      }
    };
    getImageURL();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => {
            setTextColor("red");
            setHeaderTitle("Warning!");
            addWarningToGoal(goalObj.id, "goals");
          }}
        />
      ),
    });
  }, [navigation, headerTitle]);

  return (
    <View>
      {route.params ? (
        <Text style={{ color: textColor }}>
          You are seeing the details of the goal with text:{" "}
          {route.params.goalObj.text} and ID: {route.params.goalObj.id}
        </Text>
      ) : (
        <Text style={{ color: textColor }}>More details</Text>
      )}
      <Button
        title="More details"
        onPress={() => {
          navigation.push("Details");
        }}
      ></Button>
      {imageURL ? (
        <Image source={{ uri: imageURL }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <GoalUsers goalID={route.params.goalObj.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
