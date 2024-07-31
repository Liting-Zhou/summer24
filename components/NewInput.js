import { StyleSheet, TextInput } from "react-native";
import React, { useContext } from "react";
// import { ThemeContext } from "../ThemeContext";
// import colors from "../colors";

export default function NewInput({
  onChangeText,
  value,
  editable,
  pointerEvents,
  style,
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      pointerEvents={pointerEvents}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "90%",
  },
});
