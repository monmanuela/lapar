import React from 'react';
import { Text, View } from 'react-native';
import ItemSwiper from '../components/ItemSwiper';
import { SearchBar } from 'react-native-elements';
import HorizontalItemList from '../components/HorizontalItemList';

class HomeScreen extends React.Component {
	render() {
		return (
			 <View style={{ flex: 1 }}> 
			 	<SearchBar placeholder="Search..." clearIcon />
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
