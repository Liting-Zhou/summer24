// rnf to generate a template
import { Text, View, StyleSheet } from "react-native";

export default function Header(props) {
  // console.log("Header 5:" props);
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
  },
});
