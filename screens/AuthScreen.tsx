import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../assets';
import { BackgroundContainer } from '../components/containers';
import { Text, Button } from '../components';
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const authScreen: FC = (props: any) => {
      return (
            <BackgroundContainer style={styles.container}>
                  <View>
                        <AntDesign name={'twitter'} size={35} color={Colors.white} style={styles.logoIcon}></AntDesign>
                        <Text style={styles.header}>See what's happening in the world right now</Text>
                        <Text style={styles.subHeading}>Join Twitter Today</Text>
                  </View>
                  <View style={styles.buttonView}>
                        <Button
                              title={'Signup'}
                              mode={'contained'}
                              style={styles.actionButton}
                              onPress={() => props.navigation.replace('Signup')}
                        ></Button>
                        <Button
                              title={'Login'}
                              mode={'outlined'}
                              style={styles.actionButton}
                              onPress={() => props.navigation.replace('Login')}
                        ></Button>
                  </View>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            justifyContent: 'space-between'
      },
      logoIcon: {
            marginTop: hp(10),
            marginHorizontal: wp(8),
            marginVertical: hp(2),
      },
      header: {
            marginHorizontal: wp(8),
            fontSize: 23,
            fontFamily: Fonts.regular,
            fontWeight: 'bold',
      },
      subHeading: {
            marginHorizontal: wp(8),
            marginVertical: hp(2),
      },
      buttonView: {
            width: '100%',
            alignItems: 'center'
      },
      actionButton: {
            width: wp(80),
            alignSelf: 'center',
            marginBottom: hp(2),
      },
});

export default authScreen;
