import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  pressedFunction,
  componentStyle,
}) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => {
        return [
          styles.defaultStyle,
          componentStyle,
          pressed && styles.pressedStyle,
        ];
      }}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressedStyle: {
    opacity: 0.5,
  },
  defaultStyle: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
});
