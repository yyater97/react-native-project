import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export class SearchItem extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.gotoLocation}>
        <Text style={styles.text} numberOfLines={1}> {this.props.text} </Text>
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      marginVertical: 5,
      height: 50,
      paddingTop: 12,
      borderRadius: 10,
    },
    text: {
      fontSize: 15,
      textAlign: 'left',
      width: '90%',
    }
});


export default SearchItem;