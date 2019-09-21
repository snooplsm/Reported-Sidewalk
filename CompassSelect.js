import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";



export default class CompassSelect extends React.Component {
  
  render() {
    const styles = StyleSheet.create(
      {
        Main: {
          flex: 1
        },
        middle: {
          flexDirection: 'row'
        },
        North:{
          marginVertical: 0,
          marginHorizontal: 20
        },
        East: {
          position: 'absolute',
          left: 182
        },
        South: {
          
        },
        West: {
          position: 'absolute',
          right: 70
        }
      }
    )
    return (
      <View style={styles.main}>
        <Grid>
        <Row>
          <Button title="North" style={styles.North}/>
        </Row>
        <Row style={styles.middle}>
          <Button title="West" style={styles.West}/>
          <Button title="East" style={styles.East}/>
        </Row>
        </Grid>
        <Button title="South" style={styles.South}/>
      </View>
    )
    
  }
  
}