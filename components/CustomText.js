import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";

export default function CustomText({ children }) {
  return <Text style={[styles.text]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    padding: 5,
    fontWeight: "bold",
  },
});
