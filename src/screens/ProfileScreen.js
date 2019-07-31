import React from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
     <View>
       <Text>PROFILE</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  inputField: {
    width: 280,
    color: 'black',
    borderColor: 'black',
    marginTop: 5
  },
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: 23
  }
});