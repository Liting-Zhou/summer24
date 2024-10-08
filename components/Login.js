import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";

import SimpleInput from "./SimpleInput";
import CustomText from "./CustomText";
import PressableButton from "./PressableButton";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  //go to signup page
  const handleCreateAccount = () => {
    navigation.replace("Signup");
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

      <PressableButton pressedFunction={handleLogin}>
        <Text style={{ color: "blue" }}>Log In</Text>
      </PressableButton>

      <PressableButton pressedFunction={handleCreateAccount}>
        <Text style={{ color: "blue" }}>New User? Create an account</Text>
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
