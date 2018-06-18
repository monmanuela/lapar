import React from 'react';
import { FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';

import Item from './Item';

export default class VerticalItemsList extends React.Component {
  render() {
    let items = this.props.items;
    let filterCriteria = this.props.filters;
    let sortCriteria = this.props.sort;

    let filteredItems = items.filter(
      item => item.name.includes(this.props.search) && 
        filterCriteria.every(criteria => item.tags.includes(criteria)));
    let sortedItems = filteredItems.sort( 
      function (item1, item2) { 
        return sortCriteria === 'rating'
          ? item1.rank - item2.rank
          : item1.price - item2.price; 
      });
    
    return (
        <FlatList
          data={sortedItems}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={null}
                containerStyle={{ padding: 0, width: 360, height: 50 }}
              >
                <Item item={rowData} onPress={() => this.props.navigation.navigate('Item', {item: rowData})} />
              </Card>
            );
          }}
          keyExtractor={(item, index) => index.toString() }
        />
    );
  }
} 