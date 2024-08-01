import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { writeToDB, readAllDocs } from "../firebase/firebaseHelper";

export default function GoalUsers({ goalID }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUserData() {
      try {
        //before checking the data,check if there is data
        const dataFromDB = await readAllDocs(`goals/${goalID}/users`);
        // console.log("dataFromDB", dataFromDB);
        if (dataFromDB) {
          setUsers(dataFromDB);
          return;
        }
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        //write this data to users subcollection
        const userID = goalID;
        data.forEach((userData) => {
          writeToDB(userData, `goals/${userID}/users`);
        });
        setUsers(data);
      } catch (e) {
        console.error("GoalUsers.js, error", e);
      }
    }
    fetchUserData();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
