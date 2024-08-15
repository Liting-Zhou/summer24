import { StyleSheet, View, Button } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export const verifyPermission = async () => {
  try {
    const response = await Notifications.getPermissionsAsync();
    // console.log("NotificationManager.js 8, response: ", response);
    if (response.granted) {
      return true;
    }
    const newResponse = await Notifications.requestPermissionsAsync();
    return newResponse.granted;
  } catch (err) {
    console.error("permission error: ", err);
  }
};

export default function NotificationManager() {
  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      console.log("NotificationManager.js 23, hasPermission: ", hasPermission);
      if (hasPermission) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Add a goal",
            body: "Don't forget to add a goal for today",
            data: { url: "https://www.google.com" },
          },
          trigger: {
            seconds: 3,
          },
        });
      }
    } catch (err) {
      console.error("notification error: ", err);
    }
  };

  return (
    <View>
      <Button
        title="Remind me to add a goal"
        onPress={scheduleNotificationHandler}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
