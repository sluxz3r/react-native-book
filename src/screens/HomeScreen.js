import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, TextInput, Text, Image, ScrollView, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getBooks } from '../redux/actions/book';
import { NavigationEvents } from 'react-navigation';

class HomeScreen extends Component {
  state = {
    books: [],
    refreshing: false,
    index: ''
  };
  componentDidMount = async () => {
    await this.props.dispatch(getBooks());
    this.setState({
      books: this.props.book,
    });
  };

  render() {
    return (
      <ScrollView>
        <View>
          <NavigationEvents
            onWillFocus={payload => this.props.dispatch(getBooks())}
          />
          <StatusBar backgroundColor='#f0f0f0' barStyle='dark-content' />
          <View style={styles.searchBar}>
            <TextInput style={{ marginLeft: 10, marginRight: 25, }}
              placeholder="Search..." />
          </View>

          <View style={styles.FlatList}>
            <FlatList
              data={this.props.book.bookList}
              numColumns={2}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.bookid}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity activeOpacity={1} onPress={() => { this.props.navigation.navigate('BookDetails', item) }}>
                    <View style={styles.item} key={index}>
                      {item.status_borrow == 0 ? (<Text numberOfLines={1} style={styles.textBorrow}>Available</Text>)
                        : (<Text numberOfLines={1} style={styles.textBorrowed}>Not Available</Text>)}
                      <Image style={styles.image} source={{ uri: `${item.image}` }} />
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
    book: state.book,
  };
};

export default connect(mapStateToProps)(HomeScreen);
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
    margin: 7,
    borderRadius: 8,
    elevation: 6,
    width: 145,
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
    backgroundColor: '#003994',
    position: 'absolute',
    zIndex: 1,
    width: 145,
    height: 15,
    marginTop: 192,
  },
  textBorrowed: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'grey',
    position: 'absolute',
    zIndex: 1,
    width: 145,
    height: 15,
    marginTop: 192,
  },
  image: {
    width: 145,
    height: 215,
    borderRadius: 10,
  }
})