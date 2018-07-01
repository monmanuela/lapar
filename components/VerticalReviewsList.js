import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { Card } from 'react-native-elements'
// import { reviews } from '../constants/Test';
import { Dimensions } from 'react-native';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;

export default class VerticalReviewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // reviewIds: [],
      reviews: [],
    }
  }

  componentDidMount = () => {
    console.log("in vertrevlist didmount " + JSON.stringify(this.props.reviews))
    if (this.props.reviews === undefined) { return; }
    const _reviews = Object.keys(this.props.reviews).map((reviewId, index) => {
      // with the reviewId, fetch the review object
      let review
      const db = firebase.database()
      
      db.ref("reviews/" + reviewId).once("value").then(snapshot => {
        console.log("review: " + JSON.stringify(snapshot.val()))
        review = snapshot.val()
      })
      .then(() => {
        console.log("url: " + review.photoURL)
        console.log("rating: " + review.rating)
        console.log("content: " + review.content)
        return(
          <Card key={index}>
            <Image
              style={{ height: scale(120), width: scale(295) }}
              resizeMode="cover"
              source={{uri: review.photoURL}}
            />
            <Text style={{ marginTop: scale(7), color: 'black', fontSize: 16}}>
              Rating: {review.rating}
            </Text>
            <Text>
              {review.content}
            </Text>
          </Card>
        )
      })
      .then(obj => {
        console.log("obj: " + obj)
        this.setState({ _reviews: obj })
      })
      .catch(error => console.log(error))
    })
  }

  render() {
    return (
      <View>
        {this.state._reviews}
      </View>
    );
  }
}
