import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import BookDetails from '../screens/BookDetails';

import AddScreen from '../screens/AddScreen';
import BorrowScreen from '../screens/BorrowScreen';

import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    BookDetails: { screen: BookDetails },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
      title: 'BOOK',
    },
  }
);

const AddStack = createStackNavigator(
  {
    Add: { screen: AddScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
      title: 'ADD',
    },
  }
);

const BorrowStack = createStackNavigator(
  {
    Borrow: { screen: BorrowScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
      title: 'BORROW',
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Profile: { screen: ProfileScreen },
    Register: {screen: RegisterScreen},
   
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
      title: 'PROFILE',
    },
  }
);


const switchNavigator = createBottomTabNavigator(
  {
    
    Home: { screen: HomeStack },
    Add: { screen: AddStack },
    Borrow: { screen: BorrowStack },
    Profile: { screen: ProfileStack },
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        } else if (routeName === 'Add') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Borrow') {
          iconName = `md-bookmarks`;
        } else if (routeName === 'Profile') {
          iconName = `ios-contact`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
);
//For React Navigation 2.+ need to export App only
//export default App;
//For React Navigation 3.+
export default createAppContainer(switchNavigator);