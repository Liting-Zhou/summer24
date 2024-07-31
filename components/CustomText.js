import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
// import { ThemeContext } from "../ThemeContext";

export default function CustomText({ children }) {
  // const { theme } = useContext(ThemeContext);
  return <Text style={[styles.text]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    padding: 5,
    fontWeight: "bold",
  },
});
