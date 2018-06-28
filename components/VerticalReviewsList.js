import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { Card } from 'react-native-elements'
import { reviews } from '../constants/Test';

export default class VerticalReviewsList extends React.Component {
  render() {
    const _reviews = this.props.reviews.map((reviewId, index) => {
      return(
        <Card key={index}>
          <Image
            style={{ height: 150, width: 350 }}
            resizeMode="cover"
            source={{uri: reviews[reviewId].photoURL}}
          />
          <Text>
            {reviews[reviewId].itemID}
          </Text>
          <Text>
            Rating: {reviews[reviewId].rating}
          </Text>
          <Text>
            {reviews[reviewId].content}
          </Text>
        </Card>
        )
    })

    return (
      <View>
        {_reviews}
      </View>
    );
  }
}
