import React, {Component} from 'react';
import {Animated, StyleSheet, Dimensions, View, TouchableOpacity, Image, TextInput} from 'react-native';
import MapView from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import {Tab} from '../navigator/Navigator';
var {height, width} = Dimensions.get('window');
import { firebaseApp } from './FirebaseConfig';
import {connect} from 'react-redux';
import SearchList from './SearchList';

class MapScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      txtSearch: '',
      isHiddenBusInfo: false,
      isHiddenSearchList:  false,
      markers:[],
      searchList: [],
      dataRoute: '',
      searchContainerFlexValue: 1,
      searchContentFlexValue: 4,
    };
  }

  static navigationOptions = {
    drawerLabel: 'Map',
    header: null,
  };

  componentWillMount() {
    this.onRegionChange = this.onRegionChange();
    this.searchContainerFlex = new Animated.Value(this.state.searchContainerFlexValue);
    this.gpsBtnHorizontalPos = new Animated.Value(20);
    this.itemRef = firebaseApp.database();
    this.getMarker();
  }

  onRegionChange(region){
    this.props.dispatch({type:'CLICKED_SEARCH_ITEM', region: region});
  }

  getMarker = () => {
      this.itemRef.ref('Marker').once('value').then((snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
            latlng:{latitude: child.val().latitude, longitude: child.val().longitude},
            title: child.val().name,
            description: child.val().detail,
            routes: child.val().routes,
        });
      });
      this.setState({ markers: items});
    });
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
       (position) => {
          var region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          this.props.dispatch({type:'CLICKED_SEARCH_ITEM', region: region});
       },
       (error) => alert(JSON.stringify(error)),
       { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
     );
  }

  increaseHeightOfSearchContainer = () => {
    Animated.timing(this.searchContainerFlex,{
      toValue: 10,
      duration: 1000,
    }).start();

    this.setState({
      searchContainerFlexValue: 10,
    })
  }

  moveUpGPSBtn = () => {
    Animated.timing(this.gpsBtnHorizontalPos,{
      toValue: 70,
      duration: 1000,
    }).start();
  }

  onPressUpArrow = () => {
    Animated.timing(this.searchContainerFlex,{
      toValue: 30,
      duration: 1000,
    }).start();

    this.setState({
      searchContentFlexValue: 7,
      searchContainerFlexValue: 30,
    })
  }

  onPressDownArrow = () => {
    if(this.state.searchContainerFlexValue == 30)
    {  
      Animated.timing(this.searchContainerFlex,{
        toValue: 10,
        duration: 1000,
      }).start();

      this.setState({
        searchContentFlexValue: 4,
        searchContainerFlexValue: 10,
      })
    }else{
      Animated.timing(this.searchContainerFlex,{
        toValue: 1,
        duration: 1000,
      }).start();

      this.setState({
        searchContentFlexValue: 4,
        searchContainerFlexValue: 1,
        isHiddenBusInfo: false,
      })
    }
  }

  showRoutes = (routes) => {
    this.props.dispatch({type:'CLICKED', routes: routes});
  }

  getSearchList = (text) => {
    var _searchList = [];

    if(text.length==1){
      this.state.markers.forEach((marker)=>{
        if(marker.title.toLowerCase().includes(text.toLowerCase())){   
          _searchList.push(marker);
        }
      });
      this.setState({
        isHiddenSearchList: true
      });
    }
    else if(text.length>1){
      if(this.state.searchList.length>0){
        this.state.searchList.forEach((marker)=>{
          if(marker.title.toLowerCase().includes(text.toLowerCase())){
            _searchList.push(marker);
          }
        });
      }
    }else{
      this.setState({
        isHiddenSearchList: false
      });
    }

    this.setState({
      txtSearch: text,
      searchList: _searchList,
    });
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
            region={this.props.currRegion}
          >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              routes={marker.routes}
              image={require('../img/location.png')}
              onPress={(e)=>{
                [this.increaseHeightOfSearchContainer(),
                  this.moveUpGPSBtn(),
                  this.showRoutes(marker.routes),
                  this.setState({
                    isHiddenBusInfo: true,
                  })
                ]}}
            >
            </MapView.Marker>
          ))}
          </MapView>
          <Animated.View style={[styles.gpsBtnContainer, {bottom: this.gpsBtnHorizontalPos}]}>
            <TouchableOpacity style={styles.gpsBtn} onPress={this.getCurrentLocation}>
              <Image style={styles.gpsIcon} source={require('../img/gps-fixed-indicator.png')} resizeMode="contain"/>
            </TouchableOpacity>
          </Animated.View>
          {this.state.isHiddenSearchList &&
            <View style={styles.searchListContainer}>
              <SearchList style={styles.searchList} searchList={this.state.searchList}/>
            </View>
          }
          {this.state.isHiddenBusInfo &&
            <TouchableOpacity style={styles.upArrow} onPress={this.onPressUpArrow}>
                <Image style={styles.arrowImg} source={require('../img/up-arrow.png')} resizeMode="contain"/>
            </TouchableOpacity>
          }
          {this.state.isHiddenBusInfo &&
            <TouchableOpacity style={styles.downArrow} onPress={this.onPressDownArrow}>
                <Image style={styles.arrowImg} source={require('../img/down-arrow.png')} resizeMode="contain"/>
            </TouchableOpacity>
          }
        </View>
        <Animated.View style={{flex: this.searchContainerFlex}} >
          <Animatable.View animation="slideInUp" iterationCount={1} style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <TextInput style={styles.txtSearch}
                onChangeText={
                  (text) => {
                    this.getSearchList(text);
                  }
                }
                placeholder="Nhập địa điểm muốn tìm"
                />
              <TouchableOpacity style={styles.searchBtn}>
                <Image style={styles.searchIcon} source={require('../img/magnifying-glass.png')} resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Animated.View style={{flex: this.state.searchContentFlexValue}}>
              {this.state.isHiddenBusInfo && <Tab/>}
          </Animated.View>
        </Animated.View>
      </View>
    );
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
  searchListContainer:{
    height: '20%',
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  searchList: {
    flex: 1,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    zIndex: 999,
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
  upArrow: {
    height: 30,
    width: 40,
    position: 'absolute',
    padding: 5,
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    bottom: 0,
    left: 5,
    zIndex: 999,
  },
  downArrow: {
    height: 30,
    width: 40,
    position: 'absolute',
    padding: 5,
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    bottom: 0,
    left: 45,
    zIndex: 999,
  },
  arrowImg: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  }
});

function mapStateToProps(state){
  return {currRegion: state.region};
}

export default connect(mapStateToProps)(MapScreen);
