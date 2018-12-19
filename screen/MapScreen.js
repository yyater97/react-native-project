import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, TouchableOpacity, Image, TextInput} from 'react-native';
import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');

class MapScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      txtSearch: 'Search bus station'
    };
  }

  static navigationOptions = {
    drawerLabel: 'Map',
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 13.764884,
              longitude: 100.538265,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}            
          >
          </MapView>
        </View>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TextInput style={styles.txtSearch} onChangeText={(text) => this.setState({txtSearch: text})} value={this.state.txtSearch}/>
            <TouchableOpacity style={styles.searchBtn}>
              <Image style={styles.searchIcon} source={require('../img/magnifying-glass.png')} resizeMode="contain"></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  changeTxtSearch(text){
    this.setState(text);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    height: height,
    width: width
  },
  mapContainer: {
    flex: 10,
    backgroundColor: 'yellow'
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
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

export default MapScreen;
