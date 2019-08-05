import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import Login from './Login';
import Profile from './Profile';

class Auth extends Component {
    state = {
        token:null,
    };
    constructor(props) {
        super(props);
        AsyncStorage.getItem('jwtToken').then((value) => {
            this.setState({ token: value })
        })
    }
    render() {
        return (
            <ScrollView>
                <View behavior="padding"
                    style={styles.Wrapper}>
                    <NavigationEvents
                        onWillBlur={() => AsyncStorage.getItem('jwtToken').then((value) => {
                            this.setState({ token: value })
                        })}
                    />
                    {this.state.token == null ? 
                    (<Login />):
                    (<Profile />)}
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Auth);
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
    header: {
        paddingTop:20,
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130,
        backgroundColor:'white'
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 5
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center',
        marginBottom:50
    },
    buttonContainer: {
        backgroundColor: 'black',
        marginTop: 20,
        width: 270,
        height: 40,
        borderRadius: 20,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center"
    },
})