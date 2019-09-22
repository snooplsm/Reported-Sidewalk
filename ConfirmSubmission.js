import { Text, View, Image } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { reverseGeocode } from "./Api";
import moment from "moment";

export default class ConfirmSubmission extends React.Component {
  render() {
    const { navigation } = this.props;
    const image = navigation.getParam("image");
    image.uri = image.url;
    const complaint = navigation.getParam("complaint");
    const location = navigation.getParam("location");
    return (
      <View>
        <Image
          style={{
            width: 400,
            height: 400
          }}
          source={image}
        />
        <Text style={{}}>{location}</Text>
        <Text>{complaint}</Text>
        <Button title="Submit" />
      </View>
    );
  }
}
