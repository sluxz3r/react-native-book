import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userBorrows } from '../redux/actions/history';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

class BorrowList extends Component {
  state = {
    history: [],
  };
  componentDidMount = async () => {
      const user_ktp = this.props.navigation.state.params.ktp
      const userid = this.props.navigation.state.params.userid
      const token = this.props.navigation.state.params.token
    await this.props.dispatch(userBorrows(user_ktp, userid, token));
    this.setState({
      history: this.props.history,
    });
  };
  render() {
    return (
      <ScrollView>
        <View>
        <NavigationEvents
            onWillFocus={payload => this.props.dispatch(userBorrows(this.props.navigation.state.params.ktp), payload)}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>Borrow List!</Text>
          </View>
          <View >
            <FlatList
              data={this.props.history.historyList}
              numColumns={1}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.userid}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity activeOpacity={1}>
                    <View style={styles.container} key={index}>
                      <Image style={styles.image} source={{ uri: `${item.image}` }} />
                      <View style={styles.textLeft}>
                        <Text>{item.name}</Text>
                        <Text>By :{item.writer}</Text>
                        <Text>Borrow :{moment(item.tanggal_pinjam).format("DD-MM-YYYY")}</Text>
                        <Text>Return :{moment(item.harus_kembali).format("DD-MM-YYYY")}</Text>
                        <Text>Fee :Rp.{item.denda}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
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
    history: state.history,
  };
};

export default connect(mapStateToProps)(BorrowList);
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

  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    padding: 20
  },
})