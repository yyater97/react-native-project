import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class BusInfoItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={{uri:this.props.poster}} resizeMode="contain"/>
                </View>
                <View style={styles.txtContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1}>Số xe: 150</Text>
                        <Text style={styles.sumary} numberOfLines={1}>Bến đầu: Ngã ba Vũng Tàu</Text>
                        <Text style={styles.sumary} numberOfLines={1}>Bến cuối: Chợ bến Thành</Text>
                        <Text style={styles.sumary} numberOfLines={1}>Thời gian bắt đầu: 5h30</Text>
                        <Text style={styles.sumary} numberOfLines={1}>Thời gian kết thúc: 20h30</Text>
                    </View>
                </View>   
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fca504',
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
        padding: 10,
        paddingHorizontal: 0,
        height: 150,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    imgContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        alignSelf: 'stretch',
    },
    txtContainer: {
        flex: 3,
        marginHorizontal: 10
    },
    content: {
        flex: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    sumary: {
        fontSize: 13,
        marginBottom: 5,
    },
});