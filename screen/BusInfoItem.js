import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class BusInfoItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={{uri:this.props.poster}}/>
                </View>
                <View style={styles.txtContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={2}>{this.props.title}</Text>
                        <Text style={styles.sumary} numberOfLines={7}>{this.props.overview}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.props.gotoDetailScreen} >
                            <Text style={styles.btnText}>More</Text>
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
        backgroundColor: '#E8C805',
        flexDirection: 'row',
        marginBottom: 10,
        height: 200
    },
    imgContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 130,
        height: 180,
        borderRadius: 15,
        elevation: 15        
    },
    txtContainer: {
        flex: 3,
        marginVertical: 10,
        marginHorizontal: 10
    },
    content: {
        flex: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    sumary: {
        fontSize: 11
    },
    btnContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 10
    },
    button: {
        width: 80,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00A119',
        elevation: 15
    },
    btnText: {
        fontSize: 15,
        color: '#f1f1f1'
    }
});