import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

import Colors from '../constants/Colors';

export default class HorizontalItemsSwiper extends React.Component {

  render() {
    const SwiperItems = Object.values(this.props.items).map((item, index) => {
      console.log("idx: " + index)
      console.log("item: " + JSON.stringify(item))
      return (
        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
          <ImageBackground style={{opacity: 0.6, width: 400, height: 150, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} source={{uri: item.photoUrl}}>
            <Text style={{ color: 'white', backgroundColor: 'red', fontWeight: 'bold', lineHeight: 25 }} onPress={() => this.props.navigation.navigate('Item', {item: item})}> {item.name} </Text>
          </ImageBackground>
        </View>
      );
    })

    return (
      <Swiper activeDotColor={'red'} height={200}>
        { SwiperItems }
      </Swiper>
    );
  }
}