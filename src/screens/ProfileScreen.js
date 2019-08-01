import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { login, logout, getUserId } from '../redux/actions/user';

class ProfileScreen extends Component {
    state = {
        isLogin: true,
        user:[],
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
        const del = async () => {
            const userid = this.state.userid
            console.log(userid)
            await this.props.dispatch(logout(userid));
            AsyncStorage.removeItem('userid')
            AsyncStorage.removeItem('jwtToken')
                .then(() => {
                    this.setState({ isLogin:false})
                    Alert.alert(
                        'Logout',
                        'Logout Success',
                        [
                          {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                        ],
                      );
                })
        };
        console.log("userid", this.state.isLogin)
        return (
            <View behavior="padding"
                style={{ alignItems: 'center', }}>
                <NavigationEvents
                    onWillFocus={payload => this.props.dispatch(getUserId(this.state.userid), payload)}
                />
                   <TouchableOpacity onPress={del.bind(this)} style={styles.logoutButton}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
                    </TouchableOpacity>
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
export default connect(mapStateToProps)(ProfileScreen);
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
    logoutButton: {
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