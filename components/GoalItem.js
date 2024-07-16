import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goal, deleteHandler }) {
  const navigation = useNavigation();
  const handlePressGoal = () => {
    navigation.navigate("Details", { goalObj: goal });
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
      <Button title="i" onPress={handlePressGoal}></Button>
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
