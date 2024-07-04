// rnf to generate a template
import { Text, View } from "react-native";

export default function Header(props) {
  console.log(props);
  return (
    <View>
      <Text>Welcome to {props.name}</Text>
      {props.children}
    </View>
  );
}
