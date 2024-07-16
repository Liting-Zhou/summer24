import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function GoalItem({ goal, deleteHandler, pressHandler }) {
  const goalPressed = () => {
    pressHandler(goal);
  };
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{goal.text}</Text>
      <Button
        title="X"
        onPress={() => {
          deleteHandler(goal.id);
        }}
      ></Button>
      <Button title="i" onPress={goalPressed}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "lightyellow",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
  },
  textStyle: {
    color: "red",
    padding: 10,
  },
});
