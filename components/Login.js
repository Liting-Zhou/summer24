import { StyleSheet, Text, View } from "react-native";
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
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.replace("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleCreateAccount = () => {
    navigation.replace("Signup");
  };
  return (
    <View>
      <View style={styles.formItemContainer}>
        <CustomText>Email Address</CustomText>
        <SimpleInput value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.formItemContainer}>
        <CustomText>Password</CustomText>
        <SimpleInput value={password} onChangeText={setPassword} />
      </View>

      <PressableButton pressedFunction={handleLogin}>
        <Text style={{ color: "blue" }}>Log in</Text>
      </PressableButton>

      <PressableButton pressedFunction={handleCreateAccount}>
        <Text style={{ color: "blue" }}>New User? Create an account</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  formItemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
});
