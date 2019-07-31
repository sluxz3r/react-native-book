import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

import { login, logout } from '../redux/actions/user';

class LoginScreen extends Component {
    state = {
        user: [],
        userid: '',
        refreshing: false
    };
    constructor(props) {
        super(props);
        AsyncStorage.getItem('userid').then((value) => {
            this.setState({ userid: value })
        })

    }

    render() {
        console.log(this.state.userid)
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
                .then(() => {
                    this.props.navigation.navigate("Home");
                    console.log('berhasil')
                    console.log(AsyncStorage.getItem('jwtToken'))
                    console.log(AsyncStorage.getItem('userid'))
                })
        };

        const del = async () => {
            const userid = this.state.userid
            console.log("userid", userid)
            await this.props.dispatch(logout(userid));
            AsyncStorage.removeItem('userid')
            AsyncStorage.removeItem('jwtToken')
                .then(() => {
                    this.props.navigation.navigate("Home");
                })
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
                    onChangeText={val => this.setState({ 'email': val })} />
                <TextInput
                    placeholder='password'
                    underlineColorAndroid='black'
                    placeholderTextColor='black'
                    secureTextEntry={true}
                    style={styles.inputField}
                    onChangeText={val => this.setState({ 'password': val })} />

                {this.state.userid != null ? (
                    <Text>macok</Text>) : (<Text>keluar</Text>)}
                <TouchableOpacity onPress={userLogin.bind(this)} style={styles.loginButton}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                    <Text style={{ color: 'black', marginTop: 10 }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={del.bind(this)} style={styles.loginButton}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        userid: state.userid
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