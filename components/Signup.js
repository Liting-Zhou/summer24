import { StyleSheet, Text, View } from "react-native";
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
  const handleLogin = () => {
    navigation.replace("Login");
  };
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <View>
      <View style={styles.formItemContainer}>
        <CustomText>Email Address</CustomText>
        <SimpleInput
          value={email}
          onChangeText={setEmail}
          //   style={styles.description}
        />
      </View>
      <View style={styles.formItemContainer}>
        <CustomText>Password</CustomText>
        <SimpleInput value={password} onChangeText={setPassword} />
      </View>

      <View style={styles.formItemContainer}>
        <CustomText>Confirm password</CustomText>
        <SimpleInput value={password} onChangeText={setPassword} />
      </View>
      <PressableButton pressedFunction={handleRegister}>
        <Text>Register</Text>
      </PressableButton>

      <PressableButton pressedFunction={handleLogin}>
        <Text>Already registered? Login</Text>
      </PressableButton>
    </View>
    // </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  formItemContainer: {
    // flexDirection: "row",
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
