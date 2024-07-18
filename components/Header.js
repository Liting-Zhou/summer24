import { Text, View, StyleSheet } from "react-native";

export default function Header(props) {
  return (
    <View>
      <Text style={styles.textStyle}>Welcome to {props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "purple",
    padding: 10,
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});
