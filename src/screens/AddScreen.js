import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard, 
} from 'react-native'

export default class AddScreen extends React.Component {
  state = {
    title: '', writer: '', image: '', location: '', category: '', description: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  adBook = async () => {
    const { title, writer, image, location, category, description } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    console.log(this.state.title)
    return (
      <ScrollView>
        <View
          behavior="padding"
          style={styles.Wrapper}>
            <Text>Donate</Text>
          <TextInput
            placeholder='Title'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.onChangeText('title', val)} />
          <TextInput
            placeholder='Writer'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.onChangeText('writer', val)} />
            <TextInput
            placeholder='Image'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.onChangeText('image', val)} />
            <TextInput
            placeholder='Location'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.onChangeText('location', val)} />
            <TextInput
            placeholder='Category'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.onChangeText('category', val)} />
            <TextInput
            placeholder='Description'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.onChangeText('description', val)} />
          <TouchableOpacity onPress={this.addBook}>
            <Text style={{ color: 'black', marginTop: 10 }}>Donate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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