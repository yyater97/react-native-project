import React, { Component } from 'react';
import { ActivityIndicator, View, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import BusInfoItem from './BusInfoItem';
import {firebaseApp} from './FirebaseConfig';

export default class BusInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchList: [],
      page: 1,
      txtSearch: '',
      loading: false,
    };

    this.itemRef = firebaseApp.database();
  }

  static navigationOptions = {
    header: null
  }

  getSearchList = (text) => {
    var _searchList = [];
    
    if(text.length==1){
      this.state.data.forEach((item)=>{
        if(item.name.toLowerCase().includes(text.toLowerCase())){   
          _searchList.push(item);
        }
      });
      this.setState({
        searchList: _searchList
      });
    }
    else if(text.length>1){
      if(this.state.searchList.length>0){
        this.state.searchList.forEach((item)=>{
          if(item.name.toLowerCase().includes(text.toLowerCase())){
            _searchList.push(item);
          }
        });
      }
      this.setState({
        searchList: _searchList
      });
    }else{
      this.setState({
        searchList: this.state.data
      });
    }
  }

  listenForItems = () => {
    this.itemRef.ref('BusInfo').once('value').then((snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
            imageUrl: child.val().imageUrl,
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
      this.setState({ data: items, searchList: items});
    });  
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.page!=this.state.page)
      return false
    return true;
  }

  handleEnd = () => {
    this.setState({ page: this.state.page + 1 }), () => this.getData(this.state.txtSearch, this.state.page);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Các tuyến xe buýt đang hoạt động</Text>
        <FlatList
          data = {this.state.searchList}
          keyExtractor={(x,i) => i.toString()}
          onEndReached={()=>this.handleEnd()}
          onEndReachedThreshold={0}
          // ListFooterComponent={()=>
          //   this.state.loading ? null : <ActivityIndicator size='large' animating/>}
          renderItem = {({item, index})=>{
              return(
                  <BusInfoItem
                      imageUrl={item.imageUrl}
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
                (text) => {[
                  this.setState({txtSearch: text}),
                  this.getSearchList(text)
                ]}
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
  title: {
    height: 45,
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 10,
    textAlign: 'center',
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
