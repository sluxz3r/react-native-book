import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allBorrow } from '../redux/actions/borrow';
import moment from 'moment';
import { StatusBar, StyleSheet, View, TextInput, Text, Image, ScrollView, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

class BorrowScreen extends Component {
  state = {
    borrows: []
  };
  componentDidMount = async () => {
    await this.props.dispatch(allBorrow());
    this.setState({
      borrows: this.props.borrow,
    });
  };
  render() {
    console.log(this.props.borrow.borrowList)
    return (
      <ScrollView>
        <View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>Borrow List!</Text>
          </View>
          <View >
            <FlatList
              data={this.props.borrow.borrowList}
              numColumns={1}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity activeOpacity={1}>
                    <View style={styles.container} key={index}>
                      <Image style={styles.image} source={{ uri: `${item.image}` }} />
                      <View style={styles.textLeft}>
                        <Text>{item.name}</Text>
                        <Text>By :{item.writer}</Text>
                        <Text>Name :{item.fullname}</Text>
                        <Text>Borrow :{moment(item.tanggal_pinjam).format("DD-MM-YYYY")}</Text>
                        <Text>Return :{moment(item.harus_kembali).format("DD-MM-YYYY")}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
              }>
            </FlatList>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    borrow: state.borrow,
  };
};

export default connect(mapStateToProps)(BorrowScreen);
const styles = StyleSheet.create({
  searchBar: {
    zIndex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderBottomColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
    marginTop: 10,
    marginBottom: 7,
    alignSelf: 'center',
    height: 38,
    width: 307,
    position: 'relative',
    borderRadius: 20
  },

  FlatList: {
    alignSelf: 'center',
  },

  item: {
    backgroundColor: 'black',
    margin: 5,
    borderRadius: 8,
    elevation: 6,
    width: 150,
    height: 215,
  },

  textTitle: {
    fontSize: 10,
    color: 'white',
    alignSelf: 'center',
    paddingBottom: 2,

  },
  textBorrow: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    zIndex: 1,
    width: 150,
    height: 15,
    marginTop: 195,
  },
  textBorrowed: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'grey',
    position: 'absolute',
    zIndex: 1,
    width: 150,
    height: 15,
    marginTop: 195,
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

  container:{
    flex: 1, 
    flexDirection: 'row', 
    position: 'relative',
     padding: 20
  },
})