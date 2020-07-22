import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../assets';
import { BackgroundContainer } from '../components/containers';
import { Text, FloatingActionButton } from '../components';

const notificationScreen: FC = (props: any) => {
      return (
            <BackgroundContainer style={styles.container}>
                  <Text>I am notificationScreen</Text>
                  <FloatingActionButton
                        iconName={'feather'}
                        onPress={() => {
                              // new post
                        }}
                  ></FloatingActionButton>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
});

export default notificationScreen;
