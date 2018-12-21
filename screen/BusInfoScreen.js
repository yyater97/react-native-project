import React, { Component } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BusInfoItem from './BusInfoItem';
import API from '../api/Api';

export default class BusInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListData: null,
    };

    API('').then((data)=>{
      this.setState({flatListData: data.flatData});
    });
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.state.flatListData}
          renderItem = {({item, index})=>{
              return(
                  <BusInfoItem
                      title={item.title} 
                      poster={`http://image.tmdb.org/t/p/w185/${item.poster_path}`}
                      overview={item.overview}
                      gotoDetailScreen={
                          ()=>{
                            this.props.navigation.navigate('Detail', {item: item});
                          }
                      }
                  />
              );
          }}
        />
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TextInput style={styles.txtSearch} onChangeText={(text) => {
              // API(text).then((data)=>{
              //   this.setState({flatListData: data.flatData});
              // });
            }}/>
            <TouchableOpacity style={styles.searchBtn}>
              <Image style={styles.searchIcon} source={require('../img/magnifying-glass.png')} resizeMode="contain"></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  searchBarContainer: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 5,
  },
  txtSearch: {
    flex: 5,
    backgroundColor: 'green',
    paddingLeft: 15,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#f1f1f1',
  },
  searchBtn: {
    flex: 1,
    backgroundColor: 'grey',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderLeftWidth: 1,
    borderLeftColor: '#E8E8E8',
  },
  searchIcon: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  }
});
