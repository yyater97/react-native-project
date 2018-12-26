import React, { Component } from 'react';
import { ActivityIndicator, View, TextInput, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BusInfoItem from './BusInfoItem';
import {firebaseApp} from './FirebaseConfig';

export default class BusInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      txtSearch: '',
      loading: false,
    };

    this.itemRef = firebaseApp.database();
  }

  static navigationOptions = {
    header: null
  }

  listenForItems = () => {
    this.itemRef.ref('BusInfo').once('value').then((snapshot) => {
      console.log('snap: '+snapshot.val());
      var items = [];
      snapshot.forEach((child) => {
        items.push({
            name: child.val().name,
            beginStation: child.val().beginStation,
            endStation: child.val().endStation,
            goRoute: child.val().goRoute,
            backRoute: child.val().backRoute,
            typeBus: child.val().typeBus,
            distance: child.val().distance,
            numberOfRoute: child.val().numberOfRoute,
            routeTime: child.val().routeTime,
            halfTime: child.val().halfTime,
            runTime: child.val().runTime,
            seat: child.val().seat,
          });
        });
      this.setState({ data: items});
      console.log('data: '+this.state.data);
  });  
}

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.page!=this.state.page)
      return false
    return true;
  }

  handleEnd = () => {
    console.log('handler!');
    console.log('page: '+this.state.page);
    this.setState({ page: this.state.page + 1 }), () => this.getData(this.state.txtSearch, this.state.page);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.state.data}
          keyExtractor={(x,i) => i.toString()}
          onEndReached={()=>this.handleEnd()}
          onEndReachedThreshold={0}
          ListFooterComponent={()=>
            this.state.loading ? null : <ActivityIndicator size='large' animating/>}
          renderItem = {({item, index})=>{
              console.log(item);
              return(
                  <BusInfoItem
                      name={item.name} 
                      beginStation={item.beginStation}
                      endStation={item.endStation}
                      runTime={item.runTime}
                      typeBus={item.typeBus}
                      gotoDetailScreen={
                          ()=>{
                            this.props.navigation.navigate('BusInfoDetailScreen', {item: item});
                          }
                      }
                  />
              );
          }}
        />
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TextInput style={styles.txtSearch} onChangeText={
                (text) => {
                  this.setState({txtSearch: text})
                }
              }
              placeholder="Nhập tuyến xe bus muốn tìm"
            />
            <TouchableOpacity style={styles.searchBtn} onPress={this.fetchData}>
              <Image style={styles.searchIcon} source={require('../img/magnifying-glass.png')} resizeMode="contain"></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.listenForItems();
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
