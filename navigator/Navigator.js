import MapScreen from '../screen/MapScreen';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import BusInfoScreen from '../screen/BusInfoScreen';
import {createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';


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

const DrawerNavigator = createDrawerNavigator({
    Map: {screen: MapScreen},
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    BusInfo: {screen: BusInfoScreen},
    },{
        initialRouteName: 'BusInfo',
});

export const Drawer = createAppContainer(DrawerNavigator);   

const StackNavigator = createStackNavigator({
    Map: {screen: MapScreen},
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    BusInfo: {screen: BusInfoScreen},
},{
    transitionConfig,
});

export const Stack = createAppContainer(StackNavigator);