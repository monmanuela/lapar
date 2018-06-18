import React from 'react';
import { Text, View, Modal, TouchableHighlight, FlatList, Picker, Button } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import VerticalItemsList from '../components/VerticalItemsList';
import { items } from '../constants/Test';

const filterCriterias = ['halal', 'vegetarian'];

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

  onSortChange = (value, index) => {
    console.log("on sort change " + value)
    this.setState({ sort: value });
  }

  onClear = () => {
    this.setState({ sort: 'rating', filters: [] })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal animationType='fade' onRequestClose={() => alert("Search") } visible={this.state.modalVisible}>
          <View>
            <Text>Filter:</Text>
            <FlatList
              data={filterCriterias}
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

            <Text>Sort by:</Text>
            <Picker
              selectedValue={this.state.sort}
              onValueChange={this.onSortChange}
            >
              <Picker.Item label='Rating' value='rating' />
              <Picker.Item label='Price' value='price' />
            </Picker>

            <Button title='Clear' onPress={this.onClear} />
            <Text>{'\n'}</Text>
            <Button title='Done' onPress={this.onCloseModal} />
          </View>
        </Modal>

        <View>
        	<SearchBar onChangeText={this.handleSearch} placeholder="Search..." clearIcon />
        </View>

        <TouchableHighlight onPress={this.onOpenModal}>
          <Text>Criteria</Text>
        </TouchableHighlight>

        <VerticalItemsList sort={this.state.sort} filters={this.state.filters} search={this.state.search} items={items} navigation={this.props.navigation} />
      </View>
    );
  }
}

        // View>
        //   <Icon name='navicon'/>
        // </View>