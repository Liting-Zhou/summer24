import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../firebase/firebaseSetup";

export default function Profile() {
  const user = auth.currentUser;
  console.log(auth);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
        </>
      ) : (
        <Text style={styles.text}>No user is logged in</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
