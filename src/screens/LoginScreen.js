import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

import { login } from '../redux/actions/user';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
    }

    render() {
        const { user } = this.state;
        const list = user.userList;

        const userLogin = () => {
            this.state.user.push({
                email: this.state.email,
                password: this.state.password
            });
            add()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
        };
        let add = async () => {
            await this.props.dispatch(login(this.state.user[0]))
        };
        
        return (
            <View
                behavior="padding"
                style={styles.Wrapper}>
                <TextInput
                    placeholder='email'
                    underlineColorAndroid='black'
                    placeholderTextColor='black'
                    keyboardType='email-address'
                    style={styles.inputField}
                    onChangeText={val => this.setState({ 'email': val})} />
                <TextInput
                    placeholder='password'
                    underlineColorAndroid='black'
                    placeholderTextColor='black'
                    secureTextEntry={true}
                    style={styles.inputField}
                    onChangeText={val => this.setState({ 'password': val})} />
                {AsyncStorage.userid == undefined ? (<Text>Undefined</Text>) :
                (<Text>Hahahaha</Text>)}
                <TouchableOpacity onPress={userLogin.bind(this)}  style={styles.loginButton}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                    <Text style={{ color: 'black', marginTop: 10 }}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(LoginScreen);
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
    },
    loginButton: {
        backgroundColor: 'black',
        marginTop: 40,
        width: 270,
        height: 40,
        borderRadius: 8,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center"
    },
});