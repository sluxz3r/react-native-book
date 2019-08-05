import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Image, Text, View, ImageBackground, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { NavigationEvents,withNavigation } from 'react-navigation';
import { logout, getUserId } from '../redux/actions/user';

class LoginScreen extends Component {
    state = {
        user: [],
        userid: null,
        name: '',
        ktp: '',
        email: '',
        token: '',
    };
    constructor(props) {
        super(props);
        this.buttonPress = this.buttonPress.bind(this);

    }

    buttonPress() {
      
        this.props.navigation.navigate('BorrowList', { ktp: this.state.ktp, userid: this.state.userid, token: this.state.token });
      }
    

    componentDidMount = async () => {
        const userid = this.state.userid
        await this.props.dispatch(getUserId(userid));
        this.setState({
            user: this.props.user,
        })
        AsyncStorage.getItem('userid').then((value) => {
            this.setState({ userid: value })
        })
        AsyncStorage.getItem('name').then((value) => {
            this.setState({ name: value })
        })
        AsyncStorage.getItem('ktp').then((value) => {
            this.setState({ ktp: value })
        })
        AsyncStorage.getItem('email').then((value) => {
            this.setState({ email: value })
        })
        AsyncStorage.getItem('jwtToken').then((value) => {
            this.setState({ token: value })
        })
    };

    render() {
        const del = async () => {
            const userid = this.state.userid
            await this.props.dispatch(logout(userid));
            AsyncStorage.removeItem('userid')
            AsyncStorage.removeItem('name')
            AsyncStorage.removeItem('ktp')
            AsyncStorage.removeItem('jwtToken')
                .then(() => {
                    this.setState({ userid: null })
                    this.setState({ data: [] })
                    Alert.alert(
                        'Logout',
                        'Logout Success',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                        ],
                    );
                })
        };
        console.log("KTP", this.state.user)
        console.log("TOKEN", this.state.token)
        return (
            <ScrollView>
                <View behavior="padding"
                    style={styles.Wrapper}>
                    <NavigationEvents
                        onWillFocus={payload => AsyncStorage.getItem('userid').then((value) => {
                            this.setState({ userid: value })
                        })}
                    />
                    <NavigationEvents
                        onWillBlur={payload => AsyncStorage.getItem('name').then((value) => {
                            this.setState({ name: value })
                        })}
                    />
                    <NavigationEvents
                        onWillBlur={payload => AsyncStorage.getItem('ktp').then((value) => {
                            this.setState({ ktp: value })
                        })}
                    />
                    <NavigationEvents
                        onWillFocus={payload => AsyncStorage.getItem('email').then((value) => {
                            this.setState({ email: value })
                        })}
                    />
                    <NavigationEvents
                        onWillFocus={payload => AsyncStorage.getItem('jwtToken').then((value) => {
                            this.setState({ token: value })
                        })}
                    />
                    <View>
                        <View style={styles.container}>
                            <ImageBackground style={styles.header} source={{ uri: 'https://www.mldspot.com/sites/default/files/styles/square/public/field/image/Ingin-Melihat-Langit-Penuh-Bintang-min.jpg' }} style={{ width: '100%', height: 200 }}></ImageBackground>
                            <Image style={styles.avatar} source={require('../assets/sap.jpg')} />
                            <View style={styles.body}>
                                <View style={styles.bodyContent}>
                                    <Text style={styles.name}>{this.state.name}</Text>
                                    <Text style={styles.info}>{this.state.email}</Text>
                                    <Text style={styles.info}>{this.state.ktp}</Text>
                                    <Text style={styles.description}>Hidup itu seperti Ayah dan Ibu, Kadang di atas kadang di bawah</Text>

                                    <TouchableOpacity style={styles.buttonContainer} onPress={this.buttonPress}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>History List</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={del.bind(this)} style={styles.buttonContainer}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
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
export default connect(mapStateToProps)(withNavigation(LoginScreen));
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
        paddingTop: 20,
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
        backgroundColor: 'white'
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
        marginBottom: 50
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
});