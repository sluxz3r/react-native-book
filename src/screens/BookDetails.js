import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';

export default class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.navigation.state.params.bookid,
      name: this.props.navigation.state.params.name,
      writer: this.props.navigation.state.params.writer,
      des: this.props.navigation.state.params.des,
      image: this.props.navigation.state.params.image,
      status: this.props.navigation.state.params.status_borrow,
      user: null
    };
  }
  render() {
    return (
      <View>
        <View style={{ flex: 1, flexDirection: 'row', position:'relative', padding:10}}>
          <Image style={styles.image} source={{ uri: `${this.state.image}` }} />
          <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 10 }}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>{this.state.name}</Text>
            <Text>By {this.state.writer}</Text>
             {this.state.status == 1 ? (<Button><Text>Not Available</Text></Button>) : (<Button  style={{backgroundColor:'black', alignSelf:'center', width:120, height:20}}><Text  style={{color:'white'}}>Available</Text></Button>)}
             { this.state.user != null ? (<Text></Text>):(
             <Button><Text>Borrow</Text></Button>)}
             
          </View>
        </View>
        <Text style={styles.des}>{this.state.des}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 140,
    borderRadius: 10,
  },
  des:{
    marginTop: 130,
    padding:10,
    textAlign:'justify'
  }
})