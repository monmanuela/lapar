import React from 'react';
import { FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';

const myData = [
	{
		title: 'Item 1'
	},
	{
		title: 'Item 2'
	},
	{
		title: 'Item 3'
	}
];

export default () => 
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={myData}
    renderItem={({ item: rowData }) => {
      return (
        <Card
          title={null}
          containerStyle={{ padding: 0, width: 160 }}
        >
         	<Text style={{ marginBottom: 10 }}>
           	{rowData.title}
         	</Text>
        </Card>
      );
    }}
  />


