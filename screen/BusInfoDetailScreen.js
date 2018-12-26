import React, { Component } from 'react';
import { ScrollView, FlatList, Text, View, StyleSheet } from 'react-native';

export default class BusInfoDetailScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
        };
    }

    render() {
    return (
            <View style={styles.container}>
                <View style={styles.routeNameContainer}>
                    <Text style={styles.routeName}>Tuyến xe bus {this.props.navigation.state.params.item.name}</Text>
                </View>
                <ScrollView style={{height: '80%'}}>
                    <View style={styles.listImg}>
                        <FlatList
                            data = {this.state.data}
                            keyExtractor={(x,i) => i.toString()}                        
                            renderItem = {({item, index})=>{
                                return(
                                    <View style={styles.imgContainer}>
                                        <Image style={styles.image} source={require('../img/facebook.png')} resizeMode="contain"/>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>THÔNG TIN CƠ BẢN VỀ TUYẾN</Text>
                        <Text style={styles.text} >Bến đầu: {this.props.navigation.state.params.item.beginStation}</Text>
                        <Text style={styles.text} >Bến cuối: {this.props.navigation.state.params.item.endStation}</Text>
                        <Text style={styles.text} >Lượt đi : {this.props.navigation.state.params.item.goRoute}</Text>
                        <Text style={styles.text} >Lượt về : {this.props.navigation.state.params.item.backRoute}</Text>
                        <Text style={styles.text} >Loại hình hoạt động: {this.props.navigation.state.params.item.typeBus}</Text>
                        <Text style={styles.text} >Cự ly: {this.props.navigation.state.params.item.distance}</Text>
                        <Text style={styles.text} >Số chuyến: {this.props.navigation.state.params.item.numberOfRoute}</Text>
                        <Text style={styles.text} >Thời gian chuyến: {this.props.navigation.state.params.item.routeTime}</Text>
                        <Text style={styles.text} >Giãn cách: {this.props.navigation.state.params.item.halfTime}</Text>
                        <Text style={styles.text} >Thời gian hoạt động: {this.props.navigation.state.params.item.runTime}</Text>
                        <Text style={styles.text} >Loại xe: {this.props.navigation.state.params.item.seat}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    routeNameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca504',
    },
    routeName: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    listImg: {
        flex: 1,
    },
    imgContainer: {
        width: '30%',
        height: '100%',
        padding: 10,
        paddingHorizontal: 20,
    },
    image:{
        flex: 1,
        width: undefined,
        height: undefined,
        alignSelf: 'stretch',  
    },
    infoContainer: {
        flex: 6,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'center',
    },
    text: {
        fontSize: 15,
        marginBottom: 5,
    }
});