import React, { Component } from 'react';
import { ActivityIndicator, View, TextInput, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BusInfoItem from './BusInfoItem';

export default class BusInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      txtSearch: 'marvel',
      loading: false,
    };
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.page!=this.state.page)
      return false
    return true;
  }

  fetchData = async () => {
    this.setState({loading: true});
    const url = `https://api.themoviedb.org/3/search/movie?api_key=751317cfe4fa2e7948560b4fb888277f&query=${this.state.txtSearch}&page=${this.state.page}`;
    const response = await fetch(url);
    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json.results], 
      loading: false
    }));
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
              return(
                  <BusInfoItem
                      title={item.title} 
                      poster={`http://image.tmdb.org/t/p/w185/${item.poster_path}`}
                      overview={item.overview}
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
            <TextInput style={styles.txtSearch} onChangeText={(text) => {this.setState({txtSearch: text})}} value={this.state.txtSearch}/>
            <TouchableOpacity style={styles.searchBtn} onPress={this.fetchData}>
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
