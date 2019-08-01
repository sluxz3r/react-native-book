import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { login, logout, getUserId } from '../redux/actions/user';

class LoginScreen extends Component {
    state = {
        isLogin: false,
        use:[],
        userid: '',
        refreshing: false
    };
    constructor(props) {
        super(props);
        AsyncStorage.getItem('userid').then((value) => {
            this.setState({ userid: value })
        })

    }

    componentDidMount = async () => {
        const userid = this.state.userid
        await this.props.dispatch(getUserId(userid));
        this.setState({
          user: this.props.user,
        });
      };

    render() {
        const userLogin = () => {
            this.state.use.push({
                email: this.state.email,
                password: this.state.password
            });
            add()
            this.setState({ isLogin: true });
        };
        let add = async () => {
            await this.props.dispatch(login(this.state.use[0]))
                .then(() => {
                    this.props.navigation.navigate("Home");
                })
        };

        const del = async () => {
            const userid = this.state.userid
            await this.props.dispatch(logout(userid));
            AsyncStorage.removeItem('userid')
            AsyncStorage.removeItem('jwtToken')
                .then(() => {
                    this.setState({ isLogin:false})
                    this.props.navigation.navigate("Home");
                })
        };
        console.log("userid", this.state.isLogin)
        return (
            <View behavior="padding"
                style={styles.Wrapper}>
                <NavigationEvents
                    onWillFocus={payload => this.props.dispatch(getUserId(this.state.userid))}
                />
                {this.state.isLogin == false ? (
                    <View
                        style={styles.Wrapper}>
                        <Text style={styles.register}>Login</Text>
                        <TextInput
                            placeholder='Email'
                            underlineColorAndroid='black'
                            placeholderTextColor='black'
                            keyboardType='email-address'
                            style={styles.inputField}
                            onChangeText={val => this.setState({ 'email': val })} />
                        <TextInput
                            placeholder='Password'
                            underlineColorAndroid='black'
                            placeholderTextColor='black'
                            secureTextEntry={true}
                            style={styles.inputField}
                            onChangeText={val => this.setState({ 'password': val })} />


                        <TouchableOpacity onPress={userLogin.bind(this)} style={styles.loginButton}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                            <Text style={{ color: 'black', marginTop: 10 }}>Register</Text>
                        </TouchableOpacity>

                    </View>) : (<TouchableOpacity onPress={del.bind(this)} style={styles.loginButton}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
                    </TouchableOpacity>)}
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        use: state.use,
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
    register: {
        fontSize: 18,
        padding: 20
    },
});