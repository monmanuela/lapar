import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';

export default class HorizontalItemsList extends React.Component {
  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: 7 }}
        data={Object.values(this.props.locs)}
        renderItem={({ item: rowData }) => {
          return (
            <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('ExploreScreen', { locs: rowData.id }) }>
              <Card
                title={null}
                containerStyle={{ padding: 0, marginLeft: 7, marginRight: 7, width: 120, height: 200, marginBottom: 0, backgroundColor: 'red' }}
              >
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