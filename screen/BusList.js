import React, { Component } from 'react';
import { ActivityIndicator, View, TextInput, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BusInfoItem from './BusInfoItem';

export default class BusList extends Component {
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
                            this.props.navigation.navigate('Detail', {item: item});
                          }
                      }
                  />
              );
          }}
        />
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
});
