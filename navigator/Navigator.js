import MapScreen from '../screen/MapScreen';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import {createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

const DrawerNavigator = createDrawerNavigator({
    Map: {screen: MapScreen},
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    },{
        initialRouteName: 'Login',
});

export const Drawer = createAppContainer(DrawerNavigator);

const StackNavigator = createStackNavigator({
    Map: {screen: MapScreen},
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
});

export const Stack = createAppContainer(StackNavigator);