import React, { Component } from 'react';
import { Modal, Text, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { getBorrows, updateBorrow } from '../redux/actions/borrow';
import Penalty from './Penalty';

class Restore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            borrow: [],
            update: []
        };
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    componentDidMount = async () => {
        const bookid = this.props.id
        await this.props.dispatch(getBorrows(bookid));
        this.setState({
            borrow: this.props.borrow
        });
    };

    changeHandle = (e) => {
        const name = e.currentTarget.name;
        let val = e.currentTarget.value;
        this.state.borrow.borrowList[name] = val;
        this.setState({ borrow: this.state.borrow })
    };

    render() {
        const editBorrow = () => {
            this.state.update.push({
                tanggal_kembali: new Date()
            })

            update()
            this.setState((visible) => ({
                modalVisible: visible
            }));
        };
        let update = async () => {
            await this.props.dispatch(updateBorrow((this.state.update[0]), this.props.id))
                .then(() => {
                    this.setState({ modalVisible: false })
                })
        };

        const { borrow } = this.state;
        const list = borrow.borrowList;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        const date = dd + ' - ' + mm + ' - ' + yyyy;
        return (
            <View>
                <Button onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }} style={styles.borrow}>
                    <Text style={{ color: 'white' }}>Return</Text>
                </Button>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    }}>
                        <View style={{
                            width: 300,
                            height: 300,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 2
                        }}>
                            <Text style={{ fontSize: 20 }}>Title : {this.props.name}</Text>
                            <Text style={{ fontSize: 18 }}>{date}</Text>
                            <TouchableOpacity onPress={editBorrow.bind(this)} style={styles.addButton}>
                                <Penalty id={this.props.id} restoreModal={this.setModalVisible} />
                            </TouchableOpacity>
                            <TouchableHighlight
                                style={styles.cancelButton}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{ color: 'black', fontSize: 18 }}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        borrow: state.borrow
    };
};
export default connect(mapStateToProps)(Restore);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        padding: 20
    },
    textLeft: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10
    },
    image: {
        width: 90,
        height: 140,
        borderRadius: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    writer: {
        fontSize: 18,
        paddingBottom: 10
    },
    status: {
        backgroundColor: '#428bff',
        width: 140,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    borrow: {
        backgroundColor: '#df42ff',
        marginTop: 8,
        color: 'white',
        width: 140,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        elevation: 5,
    },
    des: {
        marginTop: 0,
        padding: 20,
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
    cancelButton: {
        backgroundColor: 'white',
        marginTop: 10,
        width: 160,
        height: 40,
        borderRadius: 8,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2
      },
})