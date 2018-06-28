import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

import HorizontalItemsSwiper from '../components/HorizontalItemsSwiper';
import HorizontalLocsList from '../components/HorizontalLocsList';
import { locs, items } from '../constants/Test';

export default class HomeScreen extends React.Component {
	state = { currentUser: null }

  componentDidMount() {
    console.log("home screen did mount")
  	const currentUser = firebase.auth().currentUser;
   	this.setState({ currentUser })
    console.log("currentUser: " + this.state.currentUser)
    console.log("finish set state")
  }

	render() {
		return ( 
			<View style={{ flex: 1 }}> 
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Explore')}>
          <View>
            <SearchBar placeholder="Search..." clearIcon />
          </View>
        </TouchableWithoutFeedback>

			 	{this.state.currentUser && 
        <Text>
          Hi {this.state.currentUser.email}!
        </Text> }
        <Text>{'\n'}</Text>

			 	<Text>Recommendations</Text>
        <HorizontalItemsSwiper context={'recom'} items={items} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>

  			<Text>Top 10</Text>
        <HorizontalItemsSwiper context={'top 10'} items={items} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>

  			<Text>Locations</Text>
  			<HorizontalLocsList locs={locs} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>
  		</View>
		);
	}
}
