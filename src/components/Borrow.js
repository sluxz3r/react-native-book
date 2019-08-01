import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';
import { postBorrow } from '../redux//actions/borrow';

class Borrow extends Component {
  state = {
    name: '',
    user_id: '',
    ktp: '',
    id: this.props.id,
    modalVisible: false,
    borrow: [],
  };
  constructor(props) {
    super(props);
    AsyncStorage.getItem('userid').then((value) => {
      this.setState({ user_id: value })
    })
    AsyncStorage.getItem('name').then((value) => {
      this.setState({ name: value })
    })
    AsyncStorage.getItem('ktp').then((value) => {
      this.setState({ ktp: value })
    })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    const borrow = () => {
      this.state.borrow.push({
        bookid: this.state.id,
        user_id: this.state.ktp,
      });
      add()
      this.setState((visible) => ({
        modalVisible: visible
      }));
    };
    let add = async () => {
      await this.props.dispatch(postBorrow(this.state.borrow[0]))
        .then(() => {
          this.setState((visible) => ({
            modalVisible: visible
          })
          )
        })
    };

    var today = new Date();
    var dd = String(today.getDate() + 3).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    const date = dd + ' - ' + mm + ' - ' + yyyy;
    return (
      <View>
        <Button onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }} style={styles.borrow}>
          <Text style={{ color: 'white' }}>Borrow</Text>
        </Button>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          }}>
            <View style={{
              width: 300,
              height: 300,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2
            }}>
              <View>
                <Text style={{ fontSize: 20 }}>Name : {this.state.name}</Text>
                <Text style={{ fontSize: 18 }}>ID Card :{this.state.ktp}</Text>
                <Text style={{ fontSize: 18 }}>Title : {this.props.name}</Text>
                <Text style={{ fontSize: 18 }}>Date Return :{date}</Text>
              </View>
              <TouchableOpacity onPress={borrow.bind(this)} style={styles.addButton}>
                <Text style={{ color: 'white', fontSize: 18 }}>Borrow</Text>
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    borrow: state.borrow
  };
};
export default connect(mapStateToProps)(Borrow);
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
    width: 140,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  borrow: {
    backgroundColor: '#df42ff',
    width: 140,
    height: 30,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  des: {
    marginTop: 0,
    padding: 20,
  },
  addButton: {
    backgroundColor: 'black',
    marginTop: 25,
    width: 160,
    height: 40,
    borderRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'white',
  },
  cancelButton: {
    backgroundColor: 'white',
    marginTop: 10,
    width: 160,
    height: 40,
    borderRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2
  },
  right: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
  }
})