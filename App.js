import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ConfirmAddress from "./ConfirmAddress";

export default function App() {
  return (
    <View style={styles.container}>
      <ConfirmAddress />
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
