import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import ComplaintType from "./ComplaintType"
import CompassSelect from "./CompassSelect";

export default function App() {
  return (
    <View style={styles.container}>
      <CompassSelect />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
