import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useLayoutEffect } from "react";

export default function GoalDetails({ navigation, route }) {
  //if route.params is undefined, set goalObj to a default object
  const { goalObj } = route.params
    ? route.params
    : { goalObj: { text: "Details", id: 0 } };
  const [textColor, setTextColor] = useState("black");
  const [headerTitle, setHeaderTitle] = useState(goalObj.text);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => {
            setTextColor("red");
            setHeaderTitle("Warning!");
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
    </View>
  );
}

const styles = StyleSheet.create({});
