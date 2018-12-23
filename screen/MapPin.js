import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg,{G, Defs, Circle, Rect, Use} from 'react-native-svg';

class MapPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Svg
            height="79"
            width="25"
        >
            <Defs>
                <G id="shape" transform="rotate(45,12.5,12.5)">
                    <G>
                        <Circle cx="12.5" cy="12.5" r="12.5" />
                        <Rect x="12.5" y="12.5" width="12.5" height="12.5" />
                        <Circle cx="12.5" cy="12.5" r="5" fill="blue" />
                    </G>
                </G>
            </Defs>
            <Use href="#shape" x="0" y="0"/>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    pin: {
        backgroundColor: 'yellow',
    }
});

export default MapPin;
