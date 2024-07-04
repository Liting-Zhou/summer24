// rnf to generate a template
import { Text, View } from "react-native";

export default function Header({ name }) {
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  );
}
