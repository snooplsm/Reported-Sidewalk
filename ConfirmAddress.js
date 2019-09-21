import React from "react";
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform
} from "react-native";
import { Button, Icon } from "react-native-elements";
import MapView, { Marker, Polygon } from "react-native-maps";
import { reverseGeocode, finds } from "./Api";
import marker from "./assets/marker.png";

export default class ConfirmAddress extends React.Component {
  constructor(props) {
    super(props);
    const location = (props.location &&
      props.location.place.geometry.location) || {
      lat: 40.70696,
      lng: -73.973621
    };
    this.state = {
      region: {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  fetchAddress() {
    reverseGeocode(location)
      .then(data => {
        //console.log(data);
        console.log("reverse geocoded");
        const { results: pre } = data;
        if (pre) {
          const formattedAddress = {};
          const results = [];
          pre.forEach((x, index) => {
            const { address_components: address } = x;
            const premise = finds(address, "premise");
            const building = finds(address, "street_number");
            const street = finds(address, "route");
            if (!premise && !building && !street) {
              //alert("no dice", premise, building, street);
            } else {
              //alert("we good");
              if (!formattedAddress[x.formatted_address]) {
                formattedAddress[x.formatted_address] = x;
                results.push(x);
              }
            }
          });
          this.setState({ results });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  _renderItem = ({ item }) => {
    const { address_components: address } = item;
    const premise = finds(address, "premise");
    const building = finds(address, "street_number");
    const street = finds(address, "route");
    let title = "";
    if (premise) {
      title = [premise, street].filter(x => x).join(" ");
    } else {
      title = [building, street].join(" ");
    }
    return (
      <Button
        key={item.id}
        id={item.id}
        title={title}
        onPress={() => {
          this.props.onPress({
            place: item
          });
        }}
        containerStyle={{
          padding: 5,
          opacity: 0.75
        }}
        buttonStyle={{
          backgroundColor: "#FFF",
          padding: 10
        }}
        titleStyle={{
          color: "black"
        }}
      />
    );
  };

  onRegionChange = async region => {
    this.setState(
      {
        region
      },
      () => {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const location = { lat: region.latitude, lng: region.longitude };
          reverseGeocode(location).then(data => {
            const { results: pre } = data;
            if (pre) {
              const formattedAddress = {};
              const results = [];
              pre.forEach((x, index) => {
                const { address_components: address } = x;
                const premise = finds(address, "premise");
                const building = finds(address, "street_number");
                const street = finds(address, "route");
                if (!premise && !building && !street) {
                  //alert("no dice", premise, building, street);
                } else {
                  //alert("we good");
                  if (!formattedAddress[x.formatted_address]) {
                    formattedAddress[x.formatted_address] = x;
                    results.push(x);
                  }
                }
              });
              this.setState({ results });
            }
          });
        }, 300);
      }
    );
  };

  render() {
    const { region } = this.state;
    return (
      <View
        style={
          Platform.OS === "ios"
            ? styles.mapIosContainer
            : styles.mapAndroidContainer
        }
      >
        <MapView
          style={Platform.OS === "ios" ? styles.mapIos : styles.mapAndroid}
          zoomEnabled={true}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChange}
          style={{ flex: 1 }}
        />
        {true && (
          <>
            <View style={{ right: 0, position: "absolute" }}>
              <Icon
                onPress={() => {
                  this.setState({ map: undefined });
                }}
                name="list"
                size={40}
              />
            </View>
            <View pointerEvents="none" style={styles.markerFixed}>
              <Image style={styles.marker} source={marker} />
            </View>
          </>
        )}
        <KeyboardAvoidingView>
          <View style={styles.footer}>
            {this.state.precinct && (
              <Text
                onPress={() => {
                  this.setState({ selectedPrecinct: this.state.precinct });
                }}
                style={{
                  padding: 10,
                  alignSelf: "center",
                  backgroundColor: "#000000",
                  borderRadius: 5,
                  color: "#FFF"
                }}
              >
                {this.state.precinct.name}
              </Text>
            )}
            <FlatList
              keyExtractor={this._keyExtractor}
              horizontal={true}
              renderItem={this._renderItem}
              data={this.state.results}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {},
  renderItem: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 3
  },
  buttonContainer: {
    padding: 1,
    margin: 1
  },
  button: {
    backgroundColor: "#ec682c",
    borderRadius: 2,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 14
  },
  mapIosContainer: {
    width: "100%",
    height: "100%"
  },
  mapIos: {
    flex: 1
  },
  mapAndroid: {},
  mapAndroidContainer: {
    flex: 1
  },
  markerFixed: {
    left: "50%",
    marginLeft: -40,
    marginTop: -100,
    position: "absolute",
    top: "50%"
  },
  marker: {
    height: 100,
    width: 80
  },
  footer: {
    width: "100%",
    bottom: 0,
    position: "absolute"
  },
  region: {
    color: "#fff",
    lineHeight: 20,
    margin: 20
  }
});
