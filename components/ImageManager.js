import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import PressableButton from "./PressableButton";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();

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
    } catch (e) {
      console.log("take image", e);
    }
  };
  return (
    <View>
      <PressableButton pressedFunction={takeImageHandler}>
        <Text>Take a photo</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({});
