// rnf to generate a template
import { Text, View, StyleSheet } from "react-native";

export default function Header(props) {
  // console.log("Header 5:" props);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to {props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "purple",
  },
  text: {
    color: "purple",
    padding: 20,
  },
});
