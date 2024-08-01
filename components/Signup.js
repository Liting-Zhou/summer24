import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";

import SimpleInput from "./SimpleInput";
import CustomText from "./CustomText";
import PressableButton from "./PressableButton";

export default function Signup() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //go to login page
  const handleLogin = () => {
    navigation.replace("Login");
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText>Email Address</CustomText>
      <SimpleInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Enter your email"}
      />

      <CustomText>Password</CustomText>
      <SimpleInput
        value={password}
        onChangeText={setPassword}
        placeholder={"Enter password"}
      />

      <CustomText>Confirm password</CustomText>
      <SimpleInput
        value={password}
        onChangeText={setPassword}
        placeholder={"Confirm password"}
      />

      <PressableButton pressedFunction={handleRegister}>
        <Text style={{ color: "blue" }}>Register</Text>
      </PressableButton>

      <PressableButton pressedFunction={handleLogin}>
        <Text style={{ color: "blue" }}>Already registered? Login</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
