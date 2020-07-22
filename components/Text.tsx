import React, { useState, FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../assets';

interface styleProps {
      style?: object;
}

const text: FC<styleProps> = (props) => {
      return <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
      text: {
            color: Colors.white,
            fontFamily: Fonts.regular,
      },
});

export default text;
