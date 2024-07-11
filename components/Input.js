import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";

export default function Input({ inputHandler, cancelHandler, isModalVisible }) {
  const [text, setText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  const handleConfirm = () => {
    inputHandler(text);
    setText("");
  };

  const handleCancel = () => {
    cancelHandler();
    setText("");
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.popUpContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.imageStyle}
            alt="network image"
          />
          <Image
            source={require("../assets/input.png")}
            style={styles.imageStyle}
            alt="local image"
          />
          <TextInput
            value={text}
            onChangeText={(newText) => setText(newText)}
            placeholder="Enter something here..."
            autoFocus={true} // focus when the Input component renders
            onBlur={() => setIsBlurred(true)}
            onFocus={() => setIsBlurred(false)}
            style={styles.textInputStyle}
          />
          {isBlurred && <Text>Thank you</Text>}
          <View style={styles.buttonStyle}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button
              title="Confirm"
              onPress={handleConfirm}
              disabled={text === ""}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popUpContainer: {
    backgroundColor: "gainsboro",
    padding: 20,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
  textInputStyle: {
    width: "100%",
    borderColor: "purple",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
    color: "purple",
  },
  buttonStyle: {
    flexDirection: "row",
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
});
