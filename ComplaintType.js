import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import moment from "moment";


export default class ComplaintType extends React.Component {
  
  render() {
    const complaints = ["crossing", "curb", "sidewalk conditions", "sidewalk obstructions", "tree pit"]

    return (
      <View style={styles.container}>
        {complaints.map(complaint => (<Button title={complaint} style={styles.container}/> ))}
      </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});