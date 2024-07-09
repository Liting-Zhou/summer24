import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";

export default function Input({ inputHandler, isModalVisible }) {
  const [text, setText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  const handleConfirm = () => {
    inputHandler(text);
  };

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder="Enter something here..."
          autoFocus={true} // focus when the Input component renders
          onBlur={() => setIsBlurred(true)}
          onFocus={() => setIsBlurred(false)}
        />
        {isBlurred && <Text>Thank you</Text>}
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
