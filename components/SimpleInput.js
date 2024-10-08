import { StyleSheet, TextInput } from "react-native";
import React, { useContext } from "react";
// import { ThemeContext } from "../ThemeContext";
// import colors from "../colors";

export default function SimpleInput({
  onChangeText,
  value,
  editable,
  pointerEvents,
  style,
  placeholder,
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      pointerEvents={pointerEvents}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    // width: "90%",
  },
});
