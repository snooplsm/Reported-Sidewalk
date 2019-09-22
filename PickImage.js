import { Text, View, Image, TouchableHighlight } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { reverseGeocode } from "./Api";
import moment from "moment";

export default class PickImage extends React.Component {
  constructor(params) {
    super(params);
    this.state = {};
  }
  _pickImage = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // const permission2 = await Permissions.getAsync(
    //   Permissions.WRITE_EXTERNAL_STORAGE
    // );
    const imageLaunch = ImagePicker.launchImageLibraryAsync({
      exif: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });
    const success = result => {
      if (result.cancelled) {
        return;
      }
      const { width, height, uri, type, duration } = result;
      const { exif } = result;
      const image = {
        url: uri,
        width: width,
        height: height,
        duration: duration,
        type: type
      };
      if (exif) {
        const {
          DateTimeOriginal: timeofreport,
          GPSAltitude: altitude,
          GPSLatitude: lat,
          GPSLongitude: lng
        } = exif;

        const lats = lat;
        const lngs = lng;

        //console.log(lats, lngs);

        const timeof =
          timeofreport && moment(timeofreport, "yyyy:MM:DD HH:mm:ss").toDate();

        Object.assign(image, {
          timeofreport: timeof,
          takenAt: timeof,
          altitude: altitude,
          location: { lat: lats, lng: lngs }
        });

        reverseGeocode(image.location)
          .then(places => {
            //console.log(places.results[0]);
            this.setState({ location: { place: places.results[0] } });
            this.props.navigation.navigate("ConfirmAddress", {
              image: image,
              address: places[0],
              takenAt: timeof
            });
          })
          .catch(e => {
            this.props.navigation.navigate("ConfirmAddress", {
              image: image
            });
          });
      }

      const { timeofreport } = image;

      if (timeofreport) {
        var datetime = moment(timeofreport, "yyyy:MM:DD HH:mm:ss").toDate();
        this.setState({
          timeofreport: datetime
        });
      }

      const media = [...this.state.media, image];
      this.setState({ media: media });
    };
    console.log(permission.status);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        imageLaunch.then(success);
      }
    } else {
      imageLaunch.then(success);
    }
  };

  render() {
    const reportImageSource = require("./assets/report.png");
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#fdfdfd"
        }}
      >
        <Image
          style={{
            marginTop: 24,
            height: 128,
            width: 128
          }}
          source={reportImageSource}
        />
        <Text
          style={{
            fontSize: 24,
            marginBottom: 48,
            marginTop: 24,
            marginRight: 24,
            marginLeft: 24,
            textAlign: "center"
          }}
        >
          Report Sidewalk Obstructions
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 16
            }}
          >
            Step 1: Add Photo
          </Text>
          <TouchableHighlight
            style={{
              paddingRight: 40,
              paddingLeft: 40,
              marginTop: 10,
              paddingTop: 20,
              paddingBottom: 20,
              backgroundColor: "#ff2222",
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#fff"
            }}
            onPress={this._pickImage}
            underlayColor="#fff"
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Submit Sidewalk Obstruction
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
