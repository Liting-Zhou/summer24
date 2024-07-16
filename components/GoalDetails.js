import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function GoalDetails({ navigation, route }) {
  return (
    <View>
      {route.params ? (
        <Text>
          You are seeing the details of the goal with text:{" "}
          {route.params.goalObj.text} and ID: {route.params.goalObj.id}
        </Text>
      ) : (
        <Text>More details</Text>
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
