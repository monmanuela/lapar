import React from 'react';
import { Text, View, Modal, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons';

import VerticalItemsList from '../components/VerticalItemsList';
import { items } from '../constants/Test';

export default class ExploreScreen extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		search: '',
      modalVisible: false
  	}
  }

  handleSearch = text => {
    this.setState({ search: text });
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      	<SearchBar onChangeText={this.handleSearch} placeholder="Search..." clearIcon />
        <VerticalItemsList filter={this.state.search} items={items} navigation={this.props.navigation} />
      </View>
    );
  }
}
