import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

import Colors from '../constants/Colors';

export default class HorizontalItemsSwiper extends React.Component {

  render() {
    let items = this.props.items;
    let _SwiperItems;
    if (this.props.context === 'recom') {
      _SwiperItems = Object.values(items).filter(item => item.recommended)
    } else if (this.props.context === 'top 5') {
      _SwiperItems = Object.values(items).sort((item1, item2) => item2.rating - item1.rating).slice(0, 5)
    } else {
      _SwiperItems = Object.values(items);
    }

    const SwiperItems = _SwiperItems.map((item, index) => {
      return (
        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
          <ImageBackground style={{opacity: 0.6, width: 400, height: 150, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} source={require('../assets/images/food.jpg')}>
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