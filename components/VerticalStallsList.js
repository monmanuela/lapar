import React from 'react';
import { FlatList, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import HorizontalItemsList from './HorizontalItemsList';
import { items } from '../constants/Test';

export default class VerticalStallsList extends React.Component {
  render() {
    const _items = items;
    const stalls = Object.values(this.props.stalls);
    const filterCriteria = this.props.filters;
    const locationCriteria = this.props.locations; 
    const sortCriteria = this.props.sort;

    const sortFunction = (s1, s2) => {
      return sortCriteria === 'rating'
        ? s2.rating - s1.rating
        : s1.price - s2.price
    }

    const filteredSortedStalls = stalls.sort(sortFunction)
      .map((stall, index) => {
        const filteredItems = stall.items
          .filter(item => _items[item].name.includes(this.props.search) &&
            filterCriteria.every(criteria => _items[item].tags.includes(criteria)) &&
            (locationCriteria.length === 0 || locationCriteria.includes(_items[item].locationId)))
          .map(item => _items[item])
          .sort(sortFunction);

        if (filteredItems.length === 0) { return; }
        return (
          <Card key={index}>
            <Text>{stall.name}</Text>
            <Text>Rating: {stall.rating}</Text>
            <Text>Price: ${stall.lowestPrice}</Text>
            <HorizontalItemsList items={filteredItems} navigation={this.props.navigation} />
          </Card>);
      });

    return (
      <ScrollView>
        { filteredSortedStalls }
      </ScrollView>
    );
  }
} 
