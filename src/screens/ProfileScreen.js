import React from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View
        behavior="padding"
        style={styles.Wrapper}>
        <TextInput
          placeholder='email'
          underlineColorAndroid='black'
          placeholderTextColor='black'
          keyboardType='email-address'
          style={styles.inputField} />
        <TextInput
          placeholder='password'
          underlineColorAndroid='black'
          placeholderTextColor='black'
          secureTextEntry={true}
          style={styles.inputField} />
        <TouchableOpacity>
          <Text style={{ color: 'black', marginTop: 10 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: 'black', marginTop: 10 }}>SignUp</Text>
        </TouchableOpacity>
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