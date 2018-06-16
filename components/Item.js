import React from 'react';
import { Text } from 'react-native';


export default class Item extends React.Component {
  render() {
  	return <Text onPress={this.props.onPress}>{this.props.item.name}</Text>;
  }
}
