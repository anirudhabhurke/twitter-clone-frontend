import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Colors } from '../assets';
import { Entypo } from '@expo/vector-icons';

interface fabProps {
      onPress: ((event: GestureResponderEvent) => void) | undefined;
      iconName: string;
}

const floatingActionButton: FC<fabProps> = (props) => {
      return (
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                  <Entypo name={props.iconName} size={30} color={Colors.white}></Entypo>
            </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
      container: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: Colors.primary,
            padding: 13,
            borderRadius: 30,
      },
});

export default floatingActionButton;
