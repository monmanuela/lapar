import React from 'react';
import { FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';
import Item from './Item';

export default class VerticalItemsList extends React.Component {
  render() {
    let items = this.props.items;
    let filteredItems = items.filter(item => item.name.includes(this.props.filter));
    return (
        <FlatList
          data={filteredItems}
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