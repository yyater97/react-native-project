import MapScreen from '../screen/MapScreen';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import BusInfoScreen from '../screen/BusInfoScreen';
import BusInfoDetail from '../screen/BusInfoDetail';
import Panorama from '../screen/PanoramaScreen';
import BusList from '../screen/BusList';
import BusInfoDetailScreen from '../screen/BusInfoDetailScreen';
import AddBusInfoScreen from '../screen/AddBusInfoScreen';
import AddMarkerScreen from '../screen/AddMarkerScreen';
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';


const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps
            const toIndex = index
            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth

            const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [width, 0, 0]
            })

            // Since we want the card to take the same amount of time
            // to animate downwards no matter if it's 3rd on the stack
            // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
            const translateY = position.interpolate({
            inputRange: [0, thisSceneIndex],
            outputRange: [height, 0]
            })

            const slideFromRight = { transform: [{ translateX }] }
            const slideFromBottom = { transform: [{ translateY }] }

            const lastSceneIndex = scenes[scenes.length - 1].index

            // Test whether we're skipping back more than one screen
            if (lastSceneIndex - toIndex > 1) {
            // Do not transoform the screen being navigated to
            if (scene.index === toIndex) return
            // Hide all screens in between
            if (scene.index !== lastSceneIndex) return { opacity: 0 }
            // Slide top screen down
            return slideFromBottom
            }

            return slideFromRight
        },
    }
}

const Login_SignupStackNavigator = createStackNavigator({
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
});

const BusInfoScreen_BusInfoDetailScreenStackNav = createStackNavigator({
    BusInfoScreen: {screen: BusInfoScreen},
    BusInfoDetailScreen: {
        screen: BusInfoDetailScreen,

    },
});

const DrawerNavigator = createDrawerNavigator({
    Map: {screen: MapScreen,
        navigationOptions: {
            title: 'Bảng đồ trạm xe buýt'
        }
    },
    Login: {screen: Login_SignupStackNavigator,
        navigationOptions: {
            title: 'Đăng nhập'
        }
    },
    BusInfo: {screen: BusInfoScreen_BusInfoDetailScreenStackNav,
        navigationOptions: {
            title: 'Danh sách các tuyến xe buýt'
        }
    },
    AddBusInfoData: {screen: AddBusInfoScreen,
        navigationOptions: {
            title: 'Thêm thông tin tuyến'
        }
    },
    AddMarkerData: {screen: AddMarkerScreen,
        navigationOptions: {
            title: 'Thêm thông tin trạm'
        }
    },
    },{
        initialRouteName: 'Map',
});

export const RootNav = createAppContainer(DrawerNavigator);

const BusList_BusInfoDetailStackNavigator = createStackNavigator({
    BusInfoDetail: {
        screen: BusInfoDetail,
    },
    BusList: {screen: BusList},
},{
    initialRouteName: 'BusList',
});

//create tab navigation among buslist screen and panorama screen
const TabBottomNavigator = createBottomTabNavigator({
    BusList: {
        screen: BusList_BusInfoDetailStackNavigator,
        navigationOptions: {
            tabBarOptions: { 
                tabBarIcon: false,
                activeTintColor: "#fca504", 
                style:{
                    height: 30,
                    justifyContent: 'center',
                },
                labelStyle:{
                    fontWeight: 'bold',
                    fontSize: 15,
                },
            },
        }
    },
    Panorama: {
        screen:  Panorama,
        navigationOptions: {
            tabBarOptions: { 
                tabBarIcon: false,
                activeTintColor: "#fca504", 
                style:{
                    height: 30,
                    justifyContent: 'center',
                },
                labelStyle:{
                    fontWeight: 'bold',
                    fontSize: 15,
                }
            },
        }
    },
})

export const Tab = createAppContainer(TabBottomNavigator);