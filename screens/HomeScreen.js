import React from 'react';
import { Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
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
			<View style={{ flex: 1, backgroundColor: 'white' }}> 
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Explore')}>
          <View>
            <SearchBar inputStyle={{ backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'red' }} placeholder="Search..." clearIcon />
          </View>
        </TouchableWithoutFeedback>

			 	<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Recommendations</Text>
        <HorizontalItemsSwiper context={'recom'} items={items} navigation={this.props.navigation} />

  			<Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 5, fontSize: 18, color: 'black' }}>Top 5</Text>
        <HorizontalItemsSwiper context={'top 5'} items={items} navigation={this.props.navigation} />

  			<Text style={{ marginTop: 10, marginLeft: 10, fontSize: 18, color: 'black' }}>Locations</Text>
  			<HorizontalLocsList locs={locs} navigation={this.props.navigation} />
        <Text>{'\n'}</Text>
  		</View>
		);
	}
}
