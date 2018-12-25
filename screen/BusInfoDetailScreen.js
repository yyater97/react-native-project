import React, { Component } from 'react';
import { ScrollView, FlatList, Text, View, StyleSheet } from 'react-native';

export default class BusInfoDetailScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
        };
    }

    static navigationOptions = {
        
    };
  
    render() {
    return (
            <View style={styles.container}>
                <View style={styles.routeNameContainer}>
                    <Text style={styles.routeName}>Tuyến xe bus 150</Text>
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
                        <Text style={styles.text} >Bến đầu: Ngã ba Vũng Tàu</Text>
                        <Text style={styles.text} >Bến cuối: Chợ bến Thành</Text>
                        <Text style={styles.text} >Lượt đi : Ga Chợ Lớn (Bến A)-Lê Quang Sung-Phạm Đình Hổ-Tháp Mười-Ngô Nhân Tịnh-Phú Hữu-Hồng Bàng-An Dương Vương-Nguyễn Tri Phương-Ngô Gia Tự-Điện Biên Phủ-Xa lộ Hà Nội-Quốc lộ 52-Ngã ba Tân Vạn- Ngã 4 Vũng Tàu - Bến xe Ngã 4 Vũng Tàu 9 - Ngã 3 Tân Vạn</Text>
                        <Text style={styles.text} >Lượt về : Ngã ba Tân Vạn-Quốc lộ 52-Xa lộ Hà Nội-Điện Biên Phủ-Nguyễn Bỉnh Khiêm-Nguyễn Đình Chiểu-Lý Thái Tổ-Ngô Gia Tự-Hồng Bàng-Phú Hữu-Ga Chợ Lớn Bến A</Text>
                        <Text style={styles.text} >Loại hình hoạt động: Buýt có trợ giá</Text>
                        <Text style={styles.text} >Cự ly: 28,75 km</Text>
                        <Text style={styles.text} >Số chuyến: 370 chuyến/ngày</Text>
                        <Text style={styles.text} >Thời gian chuyến: 80 phút</Text>
                        <Text style={styles.text} >Giãn cách: 4 - 12 phút/chuyến</Text>
                        <Text style={styles.text} >Thời gian hoạt động:</Text>
                        <Text style={styles.text} >BX Chợ Lớn: 04h30 - 20h45</Text>
                        <Text style={styles.text} >Ngã 3 Tân Vạn: 04h30 - 20h30</Text>
                        <Text style={styles.text} >Loại xe: 80 chỗ</Text>
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