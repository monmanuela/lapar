import React from 'react';
import { FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';
import Item from './Item';

export default class HorizontalItemsList extends React.Component {
  render() {
    return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.items}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={null}
                containerStyle={{ padding: 0, width: 120 }}
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