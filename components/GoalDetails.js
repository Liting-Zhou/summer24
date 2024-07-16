import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalDetails({ navigation, route }) {
  console.log("route", route);
  return (
    <View>
      <Text>
        You are seeing the details of the goal with text:
        {route.params.goalObj.text} and id: {route.params.goalObj.id}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
