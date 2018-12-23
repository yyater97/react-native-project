import React, {Component} from 'react';
import {Animated, Text, StyleSheet, Dimensions, View, TouchableOpacity, Image, TextInput} from 'react-native';
import MapView from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import BusList from './BusList';
var {height, width} = Dimensions.get('window');

class MapScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      txtSearch: '',
      isHiddenBusInfo: false,
      region: {
        latitude: 10.8830802,
        longitude: 106.7808475,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      markers:[
        {
          latlng:{latitude: 10.8830802, longitude: 106.7808475},
          title: "Victory Nonument",
          description: "A large military monument in Bangkok, Thailand."
        },
        {
          latlng:{latitude: 10.763681, longitude: 106.538125},
          title: "Saxophone Club",
          description: "A music pub for saxophone lover."
        },
      ]
    };
  }

  static navigationOptions = {
    drawerLabel: 'Map',
  };

  componentWillMount() {
    this.onRegionChange = this.onRegionChange();
    this.searchContainerFlex = new Animated.Value(1);
    this.gpsBtnHorizontalPos = new Animated.Value(20);
  }

  onRegionChange(region){
    this.setState({region});
  }

  increaseHeightOfSearchContainer = () => {
    Animated.timing(this.searchContainerFlex,{
      toValue: 10,
      duration: 1000,
    }).start();
  }

  moveUpGPSBtn = () => {
    Animated.timing(this.gpsBtnHorizontalPos,{
      toValue: 70,
      duration: 1000,
    }).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animatable.View style={styles.menuBtnContainer} animation="slideInDown" iterationCount={1}>
          <TouchableOpacity style={styles.menuBtn} onPress={
            () => {
              this.props.navigation.openDrawer();
            }
          }>
            <Image style={styles.menuIcon} source={require('../img/menu.png')} resizeMode="contain"/>
          </TouchableOpacity>
        </Animatable.View>
        <View style={styles.mapContainer} animation="bounceInDown" iterationCount={1}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 10.8830802,
              longitude: 106.7808475,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
            mapType="standard"
            showsUserLocation={true}
            followsUserLocation={true}
            showsCompass={false}
            showsPointsOfInterest={false}
            region={this.state.region}
          >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require('../img/location.png')}
              onPress={(e)=>{
                [this.increaseHeightOfSearchContainer(),
                  this.moveUpGPSBtn(),
                  this.setState({
                    isHiddenBusInfo: true,
                  })
                ]}}
            >
              {/* <MapView.Callout tooltip style={styles.customView}>
                <TouchableOpacity onPress= {this.increaseHeightOfSearchContainer()}>
                </TouchableOpacity>
              </MapView.Callout> */}
            </MapView.Marker>
          ))}
          </MapView>
          <Animated.View style={[styles.gpsBtnContainer, {bottom: this.gpsBtnHorizontalPos}]}>
            <TouchableOpacity style={styles.gpsBtn}>
              <Image style={styles.gpsIcon} source={require('../img/gps-fixed-indicator.png')} resizeMode="contain"/>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View style={{flex: this.searchContainerFlex}} >
          <Animatable.View animation="slideInUp" iterationCount={1} style={styles.searchBarContainer}>
              <View style={styles.searchBar}>
                <TextInput style={styles.txtSearch} placeholder="Nhập địa điểm muốn tìm" onChangeText={(text) => this.setState({txtSearch: text})} value={this.state.txtSearch}/>
                <TouchableOpacity style={styles.searchBtn}>
                  <Image style={styles.searchIcon} source={require('../img/magnifying-glass.png')} resizeMode="contain"></Image>
                </TouchableOpacity>
              </View>
          </Animatable.View>
          <Animated.View style={{flex: 4}}>
            {this.state.isHiddenBusInfo && <BusList/>}
          </Animated.View>
        </Animated.View>
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
    position: 'relative',
  },
  menuBtnContainer: {
    flex: 1,
    zIndex: 999,
    position: 'absolute',
    top: 10,
    left: 10,
    height: 40,
    width: 40,
  },
  menuBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  menuIcon: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  mapContainer: {
    flex: 10,
    backgroundColor: 'yellow',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  gpsBtnContainer: {
    flex: 1,
    zIndex: 999,
    position: 'absolute',
    right: 10,
    height: 50,
    width: 50,
  },
  gpsBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  gpsIcon: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
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
    height: 50,
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
    height: 50,
  },
  searchIcon: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  marker: {
    backgroundColor: '#fca504', 
  },
});

export default MapScreen;
