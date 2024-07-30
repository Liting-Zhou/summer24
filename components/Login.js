import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";

import NewInput from "./NewInput";
import CustomText from "./CustomText";
import PressableButton from "./PressableButton";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
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
        <NewInput
          value={email}
          onChangeText={setEmail}
          //   style={styles.description}
        />
      </View>
      <View style={styles.formItemContainer}>
        <CustomText>Password</CustomText>
        <NewInput value={password} onChangeText={setPassword} />
      </View>

      <PressableButton pressedFunction={handleLogin}>
        <Text>Log in</Text>
      </PressableButton>

      <PressableButton pressedFunction={handleCreateAccount}>
        <Text>New User? Create an account</Text>
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
