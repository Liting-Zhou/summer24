import { Alert, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import PressableButton from "./PressableButton";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  const verifyPermissions = async () => {
    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera permissions to use this feature",
          [{ text: "Okay" }]
        );
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowEditing: true,
      });
      console.log(result);
      setImageUri(result.assets[0].uri);
    } catch (e) {
      console.log("take image", e);
    }
  };
  return (
    <View>
      <PressableButton pressedFunction={takeImageHandler}>
        <Text>Take a photo</Text>
      </PressableButton>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
