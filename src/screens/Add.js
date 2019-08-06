import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { postBook } from '../redux/actions/post';
import ImagePicker from 'react-native-image-picker';

class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      filePath: null
    };
  }
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }
  chooseFile = () => {
    var options = {
      title: 'Choose Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    const bookAdd = () => (
      dataFile = new FormData(),
      dataFile.append('image',
        {
          uri: this.state.filePath.uri,
          type: 'image/jpg',
          name: 'bebas'
        }
      ),
      dataFile.append('name', this.state.name),
      dataFile.append('writer', this.state.writer),
      dataFile.append('fk_loc', this.state.fk_loc),
      dataFile.append('des', this.state.des),
      dataFile.append('fk_cat', this.state.fk_cat),
      this.props.dispatch(postBook(dataFile))
      .then(this.props.navigation.navigate('home'))
  )
    return (
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            behavior="padding"
            style={styles.Wrapper}>
            <Text style={styles.text}>Donate</Text>
            <TextInput
              placeholder='Title'
              underlineColorAndroid='black'
              placeholderTextColor='black'
              style={styles.inputField}
              onChangeText={val => this.setState({ 'name': val })} />
            <TextInput
              placeholder='Writer'
              underlineColorAndroid='black'
              placeholderTextColor='black'
              style={styles.inputField}
              onChangeText={val => this.setState({ 'writer': val })} />

            {/* <TextInput
              placeholder='Image'
              underlineColorAndroid='black'
              placeholderTextColor='black'
              style={styles.inputField}
              onChangeText={val => this.setState({ 'image': val })} /> */}

            <TouchableOpacity
              style={styles.inputBox}
              onPress={this.chooseFile.bind(this)}>
              <Text style={{ color: 'black', height: 50, marginTop: 10, marginBottom: -20 }}>Choose Photo </Text>
            </TouchableOpacity>

            <TextInput
              placeholder='Location'
              underlineColorAndroid='black'
              placeholderTextColor='black'
              style={styles.inputField}
              onChangeText={val => this.setState({ 'fk_loc': val })} />
            <TextInput
              placeholder='Category'
              underlineColorAndroid='black'
              placeholderTextColor='black'
              style={styles.inputField}
              onChangeText={val => this.setState({ 'fk_cat': val })} />
            <TextInput
              placeholder='Description'
              underlineColorAndroid='black'
              placeholderTextColor='black'
              style={styles.inputField}
              onChangeText={val => this.setState({ 'des': val })} />
            <TouchableOpacity onPress={bookAdd.bind(this)} style={styles.addButton}>
              <Text style={{ color: 'white', fontSize: 18 }}>Donate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
const mapStateToProps = state => {
  return {
    post: state.post
  };
};
export default connect(mapStateToProps)(withNavigation(AddScreen));

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
    fontSize: 23,
    paddingTop: 20
  },
  addButton: {
    backgroundColor: 'black',
    marginTop: 40,
    width: 160,
    height: 40,
    borderRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
});