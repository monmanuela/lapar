import React from 'react';
import { Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

import HorizontalItemsSwiper from '../components/HorizontalItemsSwiper';
import HorizontalItemsList from '../components/HorizontalItemsList';
import { recommendations, tops, locs } from '../constants/Test';

export default class HomeScreen extends React.Component {
	state = { currentUser: null }

  componentDidMount() {
  	const { currentUser } = firebase.auth()
   	this.setState({ currentUser })
  }

	render() {
		const { currentUser } = this.state

		return (
        
			 <View style={{ flex: 1 }}> 
			 	<SearchBar placeholder="Search..." clearIcon />
			 	<Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Text>{'\n'}</Text>

			 	<Text>Recommendations</Text>
        <HorizontalItemsSwiper items={recommendations} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>

  			<Text>Top 10</Text>
        <HorizontalItemsSwiper items={tops} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>

  			<Text>Locations</Text>
  			<HorizontalItemsList items={locs} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>
  		</View>
		);
	}
}
