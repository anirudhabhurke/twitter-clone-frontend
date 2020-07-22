import React, { FC } from 'react';
import { View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Colors } from '../../assets';

const backgroundContainer: FC<{ style: object }> = (props) => {
      return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={{ ...props.style, ...styles.container }}>
                        <StatusBar barStyle={'light-content'} backgroundColor={Colors.dark}></StatusBar>
                        {props.children}
                  </View>
            </TouchableWithoutFeedback>
      );
};

const styles = StyleSheet.create({
      container: {
            backgroundColor: Colors.dark,
            padding: 15,
      },
});

export default backgroundContainer;
