import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

export default function Input() {
  const [text, setText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder="Enter something here..."
        autoFocus={true} // focus when the Input component renders
        onBlur={() => setIsBlurred(true)}
        onFocus={() => setIsBlurred(false)}
      />
      {isBlurred && <Text>Thank you</Text>}
    </View>
  );
}
