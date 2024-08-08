import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapComponent({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>
      <Button
        title="Confirm selected location"
        onPress={() => {
          navigation.navigate("Profile", {
            selectedLocation,
          });
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
