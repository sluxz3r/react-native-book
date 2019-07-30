import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
 
export default class BorrowScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 50, fontSize: 25 }}>Borrow List!</Text>
      </View>
    );
  }
}