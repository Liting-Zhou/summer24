import { Alert, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import React, { useState } from "react";
import PressableButton from "./PressableButton";

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();
  const verifyPermission = async () => {
    // console.log("LocationManager.js 10, response: ", response);
    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const locateUserHandler = async () => {
    try {
      //verify permission before continuing
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission not granted",
          "Please enable location services"
        );
        return;
      } else {
        const result = await Location.getCurrentPositionAsync();
        console.log("LocationManager.js 30, location: ", result);
        setLocation({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
      }
    } catch (err) {
      console.log("get current position error", err);
    }
  };

  return (
    <View>
      <PressableButton pressedFunction={locateUserHandler}>
        <Text>Use Location</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({});
