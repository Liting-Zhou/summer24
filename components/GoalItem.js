import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";

export default function GoalItem({ goal, deleteHandler }) {
  const navigation = useNavigation();
  const handlePressGoal = () => {
    navigation.navigate("Details", { goalObj: goal });
  };

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePressGoal}
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && styles.pressedStyle,
        ]}
        android_ripple={{ color: "pink" }}
      >
        <Text style={styles.textStyle}>{goal.text}</Text>
        <PressableButton
          componentStyle={styles.buttonStyle}
          pressedFunction={() => {
            deleteHandler(goal.id);
          }}
        >
          <Text>X</Text>
        </PressableButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "lightyellow",
    borderRadius: 5,
    marginVertical: 5,
  },
  pressableContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  pressedStyle: {
    opacity: 0.5,
  },
  textStyle: {
    color: "red",
    padding: 10,
  },
  buttonStyle: {
    // backgroundColor: "gray",
  },
});
