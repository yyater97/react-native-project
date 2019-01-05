import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet} from 'react-native';
import BusItem from './BusItem';
import { connect } from 'react-redux';
import {firebaseApp} from './FirebaseConfig';


class BusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      loading: false,
    };
  }

  static navigationOptions= ({navigation})=>({
    header: null,
  })  

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.page!=this.state.page)
      return false
    return true;
  }

  getRoutes = () => {
    var arrRoutes = this.props.busRoutes.split(',');
    var items=[];
    console.log('routes: '+arrRoutes[0]);
    for(var i=0; i<arrRoutes.length; i++){
      firebaseApp.database().ref('BusInfo/bus'+arrRoutes[i]).once('value').then((snapshot) => {  
        console.log('snapshot: '+snapshot.val());
        items.push({
            name: snapshot.val().name,
            beginStation: snapshot.val().beginStation,
            endStation: snapshot.val().endStation,
            goRoute: snapshot.val().goRoute,
            backRoute: snapshot.val().backRoute,
            typeBus: snapshot.val().typeBus,
            distance: snapshot.val().distance,
            numberOfRoute: snapshot.val().numberOfRoute,
            routeTime: snapshot.val().routeTime,
            halfTime: snapshot.val().halfTime,
            runTime: snapshot.val().runTime,
            seat: snapshot.val().seat,
        });
      });
    }
    this.setState({ data: items});
  }

  handleEnd = () => {
    console.log('handler!');
    console.log('page: '+this.state.page);
    this.setState({ 
      page: this.state.page + 1 }), 
      () => this.getData(this.state.txtSearch, this.state.page);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data = {this.state.data}
          keyExtractor={(x,i) => i.toString()}
          onEndReached={()=>this.handleEnd()}
          onEndReachedThreshold={0}
          renderItem = {({item, index})=>{
              return(
                  <BusItem
                      name={item.name} 
                      beginStation={item.beginStation}
                      endStation={item.endStation}
                      runTime={item.runTime}
                      halfTime={item.halfTime}
                      gotoBusInfoDetail={
                          () => {
                            this.props.navigation.navigate('BusInfoDetail', {item: item});
                          }
                      }
                  />
              );
          }}
        />
      </View>
    );
  }

  componentDidMount = () => {
    this.getRoutes();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  list: {
    flex: 1
  }
});

function mapStateToProps(state){
  return {busRoutes: state.routes};
}

export default connect(mapStateToProps)(BusList);