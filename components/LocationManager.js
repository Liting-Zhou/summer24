import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import React, { useState } from "react";
import { mapsApiKey } from "@env";

const windowWidth = Dimensions.get("window").width;

export default function LocationManager() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
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
      <Button onPress={locateUserHandler} title="Use Location"></Button>
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
        }}
        style={styles.map}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: 200,
  },
});
