import { View, Text } from "react-native";
import React, { useState } from "react";

export default function Input() {
  const [text, setText] = useState("");

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder="Enter something here..."
      />
      <Text>Input</Text>
    </View>
  );
}
