import React, { useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { BackgroundContainer } from './containers';
import { Colors } from '../assets';

const loading: React.FC = (props) => {
      return (
            <BackgroundContainer style={styles.loadingComponent}>
                  <ActivityIndicator color={Colors.paleWhite} size={'large'}></ActivityIndicator>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      loadingComponent: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
      },
});
export default loading;
