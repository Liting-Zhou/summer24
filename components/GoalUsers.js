import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalUsers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.error("GoalUsers.js, error", e);
      }
    }
    fetchUserData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
