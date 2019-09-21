import { Text, View, Image, TouchableHighlight } from "react-native";
import { Button } from "react-native-elements";
import Img from "react-image";
import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import moment from "moment";


export default class ComplaintType extends React.Component {
  
  render() {
    // const complaints = ["crossing", "curb", "sidewalk conditions", "sidewalk obstructions", "tree pit"]

    const complaintTypes = {
      crossing: {
        name: 'Crossing', 
        uri: require('./assets/crossing.png')
      },
      curb: {
        name: 'Curb',
        uri: require('./assets/curb.png')
      },
      sidewalkConditions: {
        name: 'Sidewalk Conditions', 
        uri: require('./assets/sidewalk-conditions.png')
      },
      sidewalkObstructions: {
        name: 'Sidewalk Obstructions', 
        uri: require('./assets/sidewalk-obstructions.png')
      },
      treePit: {
        name: 'Tree Pit',
        uri: require('./assets/tree-pit.png')
      },
      chair: {
        name: 'Furniture',
        uri: require('./assets/chair.png')
      }
    }

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: "stretch",
        justifyContent: "center",
        width: '95%'
      }}>
        {Object.keys(complaintTypes).map(key => (
          <View key={complaintTypes[key].name} style={{
            backgroundColor: '#fbfbfb',
            marginTop: 8,
            padding: 8,
            height: '12%'
          }}>
            <TouchableHighlight 
              onPress={() => {
                alert('Complaint selected: ' + complaintTypes[key].name);
              }}>
              <View>
                <Image 
                  style={{
                    alignSelf: 'flex-start',
                    height: '80%', 
                    width: '100%'
                  }}
                  resizeMode="cover"
                  source={complaintTypes[key].uri} />
                <Text
                  style={{
                    marginTop: 4,
                    alignSelf: 'flex-end',
                    height: '20%', 
                    width: '100%'
                  }}>
                  {complaintTypes[key].name}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        ))}
      </View>
    )
  }
}
