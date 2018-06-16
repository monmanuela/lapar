import React from 'react';
import { Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class ExploreScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      	<SearchBar placeholder="Search..." clearIcon />
        <Text>Explore!</Text>
      </View>
    );
  }
}
