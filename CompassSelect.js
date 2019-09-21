import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class CompassSelect extends React.Component {
  _next = () => {
    this.props.navigation.navigate("ConfirmSubmission");
  };

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Button onPress={this._next} title="North" />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Button onPress={this._next} title="West" />
          <Button onPress={this._next} title="East" />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Button onPress={this._next} title="South" />
        </View>
      </View>
    );
  }
}
