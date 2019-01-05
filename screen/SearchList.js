import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { SearchItem } from './SearchItem';
import {connect} from 'react-redux';

class SearchList extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data = {this.props.searchList}
                    keyExtractor={(x,i) => i.toString()}
                    renderItem = {({item, index})=>{
                        return(
                            <SearchItem
                                text={item.title}
                                gotoLocation={
                                    () => {
                                        console.log('region: '+item.latlng.latitude+' '+item.latlng.longitude);
                                        var region={
                                            latitude: item.latlng.latitude,
                                            longitude: item.latlng.longitude,
                                            latitudeDelta: 0.005,
                                            longitudeDelta: 0.005
                                        };
                                        this.props.dispatch({type:'CLICKED_SEARCH_ITEM', region: region});
                                    }
                                }
                            />
                        );
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 5,
        borderRadius: 10,
        
    },
});

export default connect()(SearchList);