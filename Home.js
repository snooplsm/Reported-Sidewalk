import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform
} from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import marker from "./assets/marker.png";

export default class Home extends React.Component {
  render() {
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
        >
          {this._precincts.map(precinct => {
            return precinct.polygons.map(polygon => {
              return (
                <Polygon
                  tappable
                  onPress={() => {
                    this.setState({ selectedPrecinct: precinct });
                  }}
                  coordinates={polygon}
                />
              );
            });
          })}
          {this.state.big && (
            <Polygon
              coordinates={this.state.big}
              strokeWidth={5}
              strokeColor={"red"}
            />
          )}
        </MapView>
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
        {this.selectedPrecinct}
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

