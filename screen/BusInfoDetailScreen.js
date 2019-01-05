import React, { Component } from 'react';
import { ScrollView, FlatList, Text, View, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import { firebaseApp } from './FirebaseConfig';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default class BusInfoDetailScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            routeName: '150',
            imageURL:[],
            startPos: {
                latitude: 10.881857,
                longitude: 106.782885,
            },
            endPos: {
                latitude: 10.880528,
                longitude: 106.784736, 
            }
        };
    }

    static navigationOptions = {
        title: 'Thông tin về tuyến xe bus',
        headerStyle: {
            backgroundColor: '#fca504',
            height: 50,
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'black',
        },
    };

    getImage = () => {
        var imgUrl = [];
        for(var image=1; image<=3; image++){
            firebaseApp.storage().ref().child(`BusInfo/${this.state.routeName}/${image}.jpg`).getDownloadURL().then((url) => {
                imgUrl.push(url);
                this.setState({
                    imageURL: imgUrl,
                });
            });
        }
        
    }

    componentWillMount(){
        this.setState({
            routeName: this.props.navigation.state.params.item.name,
        });
    }

    getDirection = () => {

        firebaseApp.database().ref('BusInfo/bus'+this.props.navigation.state.params.item.name+'/startPos/latitude').once('value').then((snapshot) => {
            this.setState(prevState => ({
                startPos: {
                    ...prevState.startPos,
                    latitude: snapshot.val()
                }
            }))
        });
        
        firebaseApp.database().ref('BusInfo/bus'+this.props.navigation.state.params.item.name+'/startPos/longitude').once('value').then((snapshot) => {
            this.setState(prevState => ({
                startPos: {
                    ...prevState.startPos,
                    longitude: snapshot.val()
                }
            }))
        });

        firebaseApp.database().ref('BusInfo/bus'+this.props.navigation.state.params.item.name+'/endPos/latitude').once('value').then((snapshot) => {
            this.setState(prevState => ({
                endPos: {
                    ...prevState.endPos,
                    latitude: snapshot.val()
                }
            }))
        });
        
        firebaseApp.database().ref('BusInfo/bus'+this.props.navigation.state.params.item.name+'/endPos/longitude').once('value').then((snapshot) => {
            this.setState(prevState => ({
                endPos: {
                    ...prevState.endPos,
                    longitude: snapshot.val()
                }
            }))
        });

    }

    render() {
    return (
            <View style={styles.container}>
                <ScrollView style={{height: '80%'}}>
                    <View style={styles.listImg}>
                        <Swiper style={styles.wrapper} 
                                showsButtons={true} 
                                horizontal={true} 
                                autoplay={true}
                                autoplayTimeout={8}
                                paginationStyle={styles.pagination}
                                dotStyle={styles.dot}
                                activeDotStyle={styles.activeDot}
                                dotColor={'white'}
                                activeDotColor={'#fca504'}
                                nextButton={<Text style={styles.buttonText}>›</Text>}
                                prevButton={<Text style={styles.buttonText}>‹</Text>}
                                >
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{uri:this.state.imageURL[0]}}/>
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{uri:this.state.imageURL[1]}}/>
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{uri:this.state.imageURL[2]}}/>
                            </View>
                        </Swiper>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>THÔNG TIN CƠ BẢN VỀ TUYẾN</Text>
                        <View style={styles.table}>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Bến đầu:</Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.beginStation}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Bến cuối:</Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.endStation}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Lượt đi :</Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.goRoute}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Lượt về :</Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.backRoute}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Loại hình hoạt động: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.typeBus}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Cự ly: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.distance}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Số chuyến: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.numberOfRoute}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Thời gian chuyến: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.routeTime}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Giãn cách: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.halfTime}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Thời gian hoạt động: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.runTime}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.col, styles.category]}>
                                    <Text style={styles.text}>Loại xe: </Text>
                                </View>
                                <View style={[styles.col, styles.content]}>
                                    <Text style={styles.text}>{this.props.navigation.state.params.item.seat}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: 10.8830802,
                                longitude: 106.7808475,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005
                            }}
                            mapType="standard"
                            showsUserLocation={true}
                            followsUserLocation={true}
                            showsCompass={false}
                            showsPointsOfInterest={false}
                            region={this.state.region}
                        >
                        <MapView.Marker coordinate={this.state.startPos}/>
                        <MapView.Marker coordinate={this.state.endPos}/>
                        <MapViewDirections
                            origin={this.state.startPos}
                            destination={this.state.endPos}
                            apikey={"AIzaSyDJvaVGv2F6x6NAVJNliHQba0QYspeJedY"}
                            strokeWidth={5}
                            strokeColor="red"
                        />
                        </MapView>
                    </View>
                </ScrollView>
            </View>
        )
    }

    componentDidMount(){
        this.getImage();
        this.getDirection();
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
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
        height: 200,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    wrapper: {
        borderRadius: 10,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    pagination: {
        bottom: 2,
    },
    dot: {
        borderRadius: 2,
        opacity: 0.35,
        marginHorizontal: 5,
    },
    activeDot: {
        borderRadius: 2,
    },
    buttonText: {
        color: '#fca504',
        fontSize: 46,
        fontWeight: 'bold',
    },
    image:{
        flex: 1,
        width: undefined,
        height: undefined,
        alignSelf: 'stretch',
        borderRadius: 10,
    },
    infoContainer: {
        flex: 6,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    title: {
        flex: 1,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingVertical: 10,
        textAlign: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fca504',
        color: 'white',
    },
    text: {
        fontSize: 15,
        marginBottom: 5,
    },
    table: {
        flex: 8,
        padding: 5,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        padding: 5,
    },
    category: {
        flex: 1,
    },
    content: {
        flex: 3,
    },
    mapContainer: {
        height: 250,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    map: {
        flex: 1,
        borderRadius: 10,
    }
});