import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <View>
        <Text>Report Sidewalk Obstructions</Text>
        <Text>1. Add Photo</Text>
        <Button
          onPress={() => {
            alert("Submit Sidewalk Obstruction Clicked");
          }}
          title={"Submit Sidewalk Obstruction"}
        />
      </View>
    );
  }
}
