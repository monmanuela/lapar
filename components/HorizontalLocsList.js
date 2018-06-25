import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';

export default class HorizontalItemsList extends React.Component {
  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={this.props.locs}
        renderItem={({ item: rowData }) => {
          return (
            <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('ExploreScreen', { locs: rowData.id }) }>
              <Card
                title={null}
                containerStyle={{ padding: 0, width: 120, height: 120 }}
              >
                <Text>{rowData.id}</Text>
                <Text>{rowData.name}</Text>
              </Card>
            </TouchableWithoutFeedback>
          );
        }}
        keyExtractor={(item, index) => index.toString() }
      />
    );
  }
} 