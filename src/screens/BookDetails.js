import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'native-base';

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
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: `${this.state.image}` }} />
          <View style={styles.textLeft}>
            <Text style={styles.name}>{this.state.name}</Text>
            <Text style={styles.writer}>By {this.state.writer}</Text>
            {this.state.status == 1 ?
              (<Button style={styles.status}><Text>Not Available</Text></Button>) :
              (<Button style={styles.status}>
                <Text >Available</Text>
              </Button>)}
            {this.state.user != null ? (<Text></Text>) : (
              <Button style={styles.borrow}>
                <Text>Borrow</Text>
              </Button>)}

          </View>
        </View>
        <Text style={styles.des}>{this.state.des}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    flexDirection: 'row', 
    position: 'relative',
     padding: 20
  },
  textLeft:{
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10
  },
  image: {
    width: 90,
    height: 140,
    borderRadius: 10,
  },
  name:{
    fontSize: 22,
    fontWeight: 'bold'
  },
  writer:{
    fontSize: 18,
    paddingBottom: 10
  },
  status:{
    backgroundColor: '#428bff',
    width: 140,
    height:30,
    justifyContent: "center",
    alignItems: "center"
  },
  borrow:{
    backgroundColor: '#df42ff',
    width: 140,
    height: 30,
    marginTop:8,
    justifyContent: "center",
    alignItems: "center"
  },
  des: {
    marginTop: 100,
    padding: 20,
  }
})