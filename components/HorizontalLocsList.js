import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Card } from 'react-native-elements';

import {connect} from 'react-redux'
import {updateLocation} from '../redux/actions'
import store from '../redux/store'

class HorizontalLocsList extends React.Component {
  handleLocationNavigation = location => {
    this.props.updateLocation([location.name])
    this.props.navigation.navigate('ExploreScreen')
  }

  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: 7, height: 200 }}
        data={Object.values(this.props.locs)}
        renderItem={({ item: rowData }) => {
          return (
            <TouchableWithoutFeedback onPress={ () => this.handleLocationNavigation(rowData)}>
              <Card
                title={rowData.name}
                titleStyle={{ opacity: 0.7, marginTop: 0, marginBottom: 0, color: 'white', backgroundColor: 'red' }}
                containerStyle={{ padding: 0, marginLeft: 7, marginRight: 7, width: 140, height: 300, marginBottom: 0 }}
                image={{uri: rowData.photoURL}}
              >
              </Card>
            </TouchableWithoutFeedback>
          );
        }}
        keyExtractor={(item, index) => index.toString() }
      />
    );
  }
} 

const mapDispatchToProps = {
  updateLocation: updateLocation
}

export default connect(null, mapDispatchToProps)(HorizontalLocsList)