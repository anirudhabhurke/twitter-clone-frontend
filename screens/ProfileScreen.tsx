import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../assets';
import { BackgroundContainer } from '../components/containers';
import { Text, FloatingActionButton, Button } from '../components';

const profileScreen: FC = (props: any) => {
      const signOut = () => {};

      return (
            <BackgroundContainer style={styles.container}>
                  <Text>I am profile</Text>
                  <Button
                        title={'Signout'}
                        icon={'logout-variant'}
                        onPress={() => signOut()}
                        mode={'outlined'}
                        style={styles.signOutButton}
                  ></Button>
                  <FloatingActionButton
                        iconName={'edit'}
                        onPress={() => {
                              props.navigation.navigate('EditProfile');
                        }}
                  ></FloatingActionButton>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      signOutButton: {
            alignSelf: 'center',
      },
});

export default profileScreen;
