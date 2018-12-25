import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class BusItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.imgRouteContainer}>
                    <View style={styles.imgRoute}>
                        <Text style={styles.routeName}>{this.props.routeName}</Text>
                    </View>
                </View>
                <View style={styles.txtContainer}>
                    <View style={styles.content}>
                        <View style={styles.stationInfo}>
                            <Text style={styles.stationText} numberOfLines={1}>Bến đầu: Ngã ba Vũng Tàu</Text>
                            <Text style={styles.stationText} numberOfLines={1}>Bến cuối: Chợ bến Thành</Text>
                        </View>
                        <Text style={styles.time} numberOfLines={1}>Thời gian bắt đầu: 5h30</Text>
                        <Text style={styles.time} numberOfLines={1}>Thời gian kết thúc: 20h30</Text>
                    </View>
                </View>
                <View style={styles.nextBtnContainer}>
                    <TouchableOpacity style={styles.nextBtn} onPress={this.props.gotoBusInfoDetail}>
                        <View style={styles.arrow}>
                            <Image style={styles.nextBtnImg} source={require('../img/right-arrow-white.png')} resizeMode="contain"/>
                        </View>
                    </TouchableOpacity>
                </View>   
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
        padding: 10,
        paddingHorizontal: 0,
        height: 100,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    imgRouteContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgRoute: {
        flex: 1,
        height: '80%',
        width: '90%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca504',
        marginLeft: 5,
    },
    routeName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold', 
    },
    txtContainer: {
        flex: 7,
        marginHorizontal: 10
    },
    content: {
        flex: 1,
    },
    stationInfo: {
        height: '60%',
        marginBottom: 5,
    },
    stationText: {
        flex: 2,
        fontSize: 15,
        fontWeight: 'bold',
        padding: 2,
    },
    time: {
        fontSize: 10,
        marginBottom: 2,
    },
    stationArrow:{
        flex: 1,
        width: undefined,
        height: undefined,
        textAlign: 'right',
    },
    nextBtnContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextBtn: {
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fca504',
        backgroundColor: 'white',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        marginRight: 5,
    },
    arrow: {
        width: '90%',
        height: '90%',
        padding: 5,
        backgroundColor: '#fca504',
        borderRadius: 40,
    },
    nextBtnImg: {
        flex: 1,
        width: undefined,
        height: undefined,
        alignSelf: 'stretch',       
    }
});