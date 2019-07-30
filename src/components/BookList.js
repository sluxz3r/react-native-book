import React from 'react';
import data from './data'
import { StyleSheet, Text, View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class App extends React.Component {
    constructor() {
      super()
      this.state = {
          data: data,
      }
    }
    _renderItem ({item, index}) {
      return (
        <View style={styles.slide}>
            <Image style={styles.image} source={{uri:`${item.image}`}} />
            <Text style={styles.title}>{ item.title }</Text>
            <Text style={styles.writer}>By : { item.writer }</Text>
        </View>
    );}
  
    render () {
      return (
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.data}
          renderItem={this._renderItem}
          sliderWidth={380}
          itemWidth={230}
        />
   ); 
  }}

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
    
  },
    title:{
        color:'black',
        paddingTop: 5,
        paddingLeft: 5,
        fontWeight: 'bold'
    },

    writer:{
        color:'black',
        paddingLeft: 5,
    },

    image:{
        width:220,
        height:350,
        borderRadius:10
    }

});