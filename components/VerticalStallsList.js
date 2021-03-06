import React from 'react';
import { FlatList, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import HorizontalItemsList from './HorizontalItemsList';
// import { items } from '../constants/Test';

export default class VerticalStallsList extends React.Component {
  render() {
    // const _items = items;
    const _items = this.props.items
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
        const stallId = stall.stallId
        const itemIds = Object.keys(stall.items)
        const itemsPerStall = itemIds.map((id, index) => {
          return _items[id]
        })

        const filteredItems = itemsPerStall
          .filter(item => item.name.includes(this.props.search) &&
            filterCriteria.every(criteria => item.tags.includes(criteria)) &&
            (locationCriteria.length === 0 || locationCriteria.includes(item.location)))
          .sort(sortFunction);

        if (filteredItems.length === 0) { return; }
        return (
          <Card key={index}>
            <Text style={{ color: 'red', fontSize: 22 }}>{stall.name}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>Rating: {stall.rating}</Text>
            <Text style={{ fontSize: 16 }}>Price: ${stall.lowestPrice}</Text>
            <Text style={{ fontSize: 16 }}>Location: {stall.location}</Text>
            <HorizontalItemsList items={filteredItems} navigation={this.props.navigation} />
          </Card>);
      });

    return (
      <ScrollView>
        { filteredSortedStalls }
        <Text>{'\n'}</Text>
      </ScrollView>
    );
  }
} 
