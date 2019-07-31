import React, { Component } from 'react';
import { connect } from 'react-redux';
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
} from 'react-native';
import {postBook} from '../redux/actions/book';

class AddScreen extends Component {
  constructor(props) {
		super(props);
		this.state = {
			modal: false,
			act: 0,
			book: [],
		};

		this.toggle = this.toggle.bind(this);
		this.toggleDrop = this.toggleDrop.bind(this);
  }
  toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	toggleDrop() {
		this.setState((prevState) => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
  }
  render() {
    const bookAdd = () => {
			this.state.book.push({
				name: this.state.name,
				writer: this.state.writer,
				des: this.state.des,
				image: this.state.image,
				fk_cat:this.state.fk_cat,
				fk_loc:this.state.fk_loc
			});

			add()
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
		};
		let add = async () => {
      const data = this.state.book[0]
      await this.props.dispatch(postBook(data))
    };
  
    return (
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
            onChangeText={val => this.setState({ 'name': val})} />
          <TextInput
            placeholder='Writer'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.setState({ 'writer': val})}/>
            <TextInput
            placeholder='Image'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.setState({ 'image': val})} />
            <TextInput
            placeholder='Location'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.setState({ 'fk_loc': val})}/>
            <TextInput
            placeholder='Category'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.setState({ 'fk_cat': val})} />
            <TextInput
            placeholder='Description'
            underlineColorAndroid='black'
            placeholderTextColor='black'
            style={styles.inputField}
            onChangeText={val => this.setState({ 'des': val})} />
          <TouchableOpacity onPress={bookAdd.bind(this)} style={styles.addButton}>
            <Text style={{ color: 'white', fontSize:18 }}>Donate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
const mapStateToProps = state => {
	return {
		book: state.book
	};
};
export default connect(mapStateToProps)(AddScreen);

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
    paddingTop:20
  },
  addButton:{
    backgroundColor: 'black',
    marginTop:40,
    width: 160,
    height: 40,
    borderRadius:8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
});