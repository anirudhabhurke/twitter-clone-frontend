import React, { useState, FC } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Colors, Fonts } from '../assets';
import { BackgroundContainer } from '../components/containers';
import { Text, FloatingActionButton, Button } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const profileScreen: FC = (props: any) => {
      const signOut = () => {
            props.removeToken();
            AsyncStorage.multiRemove(['token', 'userId'], (err) => {
                  if (!err) {
                        ToastAndroid.show('Logged out', ToastAndroid.SHORT);
                        props.navigation.replace('Auth');
                  }
            });
      };

      return (
            <BackgroundContainer style={styles.container}>
                  <Text>I am profile</Text>
                  <Button title={'Signout'} icon={'logout-variant'} onPress={() => signOut()} mode={'outlined'} style={styles.signOutButton}></Button>
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

const mapStateToProps = (state: any) => {
      return {
            token: state.token,
            userId: state.userId,
      };
};

const mapDispatchToProps = (dispatch: any) => {
      return {
            removeToken: () => {
                  dispatch({ type: 'REMOVE_TOKEN' });
            },
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(profileScreen);
