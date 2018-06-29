import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { Card } from 'react-native-elements'
import { reviews } from '../constants/Test';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

export default class VerticalReviewsList extends React.Component {
  render() {
    // const _reviews = this.props.reviews.map((reviewId, index) => {
    const fakeArr = ["r1"]
    const _reviews = fakeArr.map((reviewId, index) => {    
      return(
        <Card key={index}>
          <Image
            style={{ height: scale(120), width: scale(290) }}
            resizeMode="cover"
            source={{uri: reviews[reviewId].photoURL}}
          />
          <Text style={{ marginTop: scale(7), color: 'black', fontSize: 16}}>
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
