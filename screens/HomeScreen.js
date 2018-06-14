import React from 'react';
import { Text, View } from 'react-native';
import ItemSwiper from '../components/ItemSwiper';
import { SearchBar } from 'react-native-elements';
import HorizontalItemList from '../components/HorizontalItemList';
import firebase from 'react-native-firebase';

class HomeScreen extends React.Component {
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
			 	<Text>Recommendations</Text>
  			<ItemSwiper />
  			<Text>Top 10</Text>
  			<ItemSwiper />
  			<Text>Locations</Text>
  			<HorizontalItemList />
  			<Text>...</Text>
  		</View>
		);
	}
}

export default HomeScreen
