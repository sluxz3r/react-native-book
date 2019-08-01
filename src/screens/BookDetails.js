import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert, AsyncStorage  } from 'react-native';
import { Button } from 'native-base';
import Borrow from '../components/Borrow';
import Restore from '../components/Restore';

class BookDetails extends Component {
    state = {
      id: this.props.navigation.state.params.bookid,
      name: this.props.navigation.state.params.name,
      writer: this.props.navigation.state.params.writer,
      des: this.props.navigation.state.params.des,
      image: this.props.navigation.state.params.image,
      status: this.props.navigation.state.params.status_borrow,
      modalVisible: false,
      userid: null,
    }
    constructor(props) {
      super(props);
      AsyncStorage.getItem('userid').then((value) => {
        this.setState({ userid: value })
    })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `${this.state.image}` }} />
            <View style={styles.textLeft}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.writer}>By {this.state.writer}</Text>
              {this.state.status == 1 ?
                (<Button style={styles.status}><Text style={{color:'white'}}>Not Available</Text></Button>) :
                (<Button style={styles.status}>
                  <Text style={{color:'white'}}>Available</Text>
                </Button>)}
                {this.state.userid == null ? 
                (<TouchableOpacity  onPress={() => { this.props.navigation.navigate('Login')}} style={styles.login}><Text style={{color:'black'}}>Login!</Text></TouchableOpacity>):(
              <View>
                {this.state.status == 1 ?
                  (<Restore id={this.state.id} name={this.state.name} />) :
                  (<Borrow id={this.state.id} name={this.state.name} />)}
              </View>)}

            </View>
          </View>
          <Text style={styles.des}>{this.state.des}</Text>

        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    borrow: state.borrow,
  };
};

export default connect(mapStateToProps)(BookDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    padding: 20
  },
  textLeft: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10
  },
  image: {
    width: 90,
    height: 140,
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  writer: {
    fontSize: 18,
    paddingBottom: 10
  },
  status: {
    backgroundColor: '#428bff',
    color:'white',
    width: 140,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  borrow: {
    backgroundColor: '#df42ff',
    color:'white',
    width: 140,
    height: 30,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:2
  },
  login : {
    backgroundColor: 'white',
    color:'black',
    width: 140,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
    borderWidth:2
  },
  des: {
    marginTop: 0,
    padding: 20,
  }
})