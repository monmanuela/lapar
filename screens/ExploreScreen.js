import React from 'react';
import { Text, View, Modal, TouchableHighlight, FlatList } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons';

import VerticalItemsList from '../components/VerticalItemsList';
import { items } from '../constants/Test';

const _criterias = ['halal', 'vegetarian'];

export default class ExploreScreen extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		search: '',
      modalVisible: false,
      sort: '',
      filters: []
  	}
  }

  handleSearch = text => {
    this.setState({ search: text });
  }

  onOpenModal = () => {
    this.setState({ modalVisible: true });
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false });
  }

  onCheckFilter = criteria => {
    const { filters } = this.state;

    if (!filters.includes(criteria)) {
      this.setState({ filters: [...filters, criteria] });
    } else {
      this.setState({ filters: filters.filter( c => c !== criteria) });
    }
  }

  onClear = () => {
    this.setState({ filters: [] })
  }

  render() {
    console.log(this.state.filters)
    return (
      <View style={{ flex: 1 }}>
        <Modal onRequestClose={() => alert("Search") } visible={this.state.modalVisible}>
          <View>
            <FlatList
              data={_criterias}
              extraData={this.state}
              renderItem={({item: criteria}) => (
                <CheckBox
                  title={criteria}
                  onPress={() => this.onCheckFilter(criteria)}
                  checked={this.state.filters.includes(criteria)}
                />
              )}
              keyExtractor={(item, index) => index.toString() }
            />
            <TouchableHighlight onPress={this.onCloseModal}>
              <Text>Search</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.onClear}>
              <Text>Clear</Text>
            </TouchableHighlight>
          </View>
        </Modal>

        <TouchableHighlight onPress={this.onOpenModal}>
          <Text>Criteria</Text>
        </TouchableHighlight>

      	<SearchBar onChangeText={this.handleSearch} placeholder="Search..." clearIcon />
        <VerticalItemsList filters={this.state.filters} search={this.state.search} items={items} navigation={this.props.navigation} />
      </View>
    );
  }
}
