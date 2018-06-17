import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Button, Text, TouchableWithoutFeedback } from 'react-native'
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default EditProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    }
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      tabBarVisible: false, // doesn't work??
      headerRight: (
        <TouchableWithoutFeedback onPress=  {() => alert('Saved changes!')}>
          <Icon color="black" name="check" size={25} />
        </TouchableWithoutFeedback>
      )
    })
  }
})