import { Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import moment from "moment";

export default class Home extends React.Component {
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

        if (!this.state.location) {
          reverseGeocode(image.location)
            .then(places => {
              //console.log(places.results[0]);
              this.setState({ location: { place: places.results[0] } });
            })
            .catch(e => console.log(e));
        }
      }

      const { timeofreport } = image;

      if (timeofreport) {
        var datetime = moment(timeofreport, "yyyy:MM:DD HH:mm:ss").toDate();
        this.setState({
          timeofreport: datetime,
          timeofreportstr: this.timeofreport(datetime)
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
    return (
      <View>
        <Text>Report Sidewalk Obstructions</Text>
        <Text>1. Add Photo</Text>
        <Button
          onPress={this._pickImage}
          title={"Submit Sidewalk Obstruction"}
        />
      </View>
    );
  }
}
