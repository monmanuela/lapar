import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createSwitchNavigator }  from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import MainTabNavigator from './MainTabNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import SignUp from '../screens/SignUpScreen';
import Login from '../screens/LoginScreen';
// import Home from '../screens/HomeScreen';
// import Explore from '../screens/ExploreScreen';
// import Profile from '../screens/ProfileScreen';

// const headerStyle = {
//   marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
// };

// export const SignedOut = StackNavigator({
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: "Sign Up",
//       headerStyle
//     }
//   },
//   Login: {
//     screen: Login,
//     navigationOptions: {
//       title: "Login",
//       headerStyle
//     }
//   }
// });

// export const SignedIn = TabNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         tabBarLabel: "Home",
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="home" size={30} color={tintColor} />
//         )
//       }
//     },
//     Explore: {
//       screen: Explore,
//       navigationOptions: {
//         tabBarLabel: "Explore",
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="home" size={30} color={tintColor} />
//         )
//       }
//     },
//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         tabBarLabel: "Profile",
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="user" size={30} color={tintColor} />
//         )
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       style: {
//         paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
//       }
//     },
//     tabBarPosition: 'bottom',
//   }
// );

export default AppNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      MainTabNavigator: {
        screen: MainTabNavigator
      },
      SignedOutNavigator: {
        screen: SignedOutNavigator
      }
    },
    {
      initialRouteName: signedIn ? 'MainTabNavigator' : 'SignedOutNavigator'
    }
  );
};