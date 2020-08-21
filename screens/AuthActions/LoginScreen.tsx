import React, { useState, FC } from 'react';
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { BackgroundContainer } from '../../components/containers';
import { Button, Text, TextInput } from '../../components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from '../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const loginScreen: FC = (props: any) => {
      const [emailState, setEmailState] = useState('');
      const [passwordState, setPasswordState] = useState('');
      const [showSpinnerState, setShowSpinnerState] = useState(false);

      const loginUser = (email: string, password: string) => {
            if (email.replace(/\s/g, '').length && password) {
                  const user = {
                        email: emailState,
                        password: passwordState,
                  };
                  axios.post('/user/login', user).then((response) => {
                        if (response.data.error) {
                              setShowSpinnerState(false);
                              ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
                        } else if (response.data.message === 'Successful login') {
                              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                              props.setToken(response.data.token, response.data.userId);
                              AsyncStorage.multiSet(
                                    [
                                          ['token', response.data.token.toString()],
                                          ['userId', response.data.userId.toString()],
                                    ],
                                    (error) => {
                                          if (!error) {
                                                props.navigation.replace('HomeNav');
                                          }
                                    }
                              );
                        }
                  });
            }
      };

      return (
            <BackgroundContainer style={styles.container}>
                  <ScrollView>
                        <Text style={styles.header}>Login</Text>
                        <TextInput
                              label={'Email'}
                              keyboardType={'email-address'}
                              textContentType={'emailAddress'}
                              value={emailState}
                              onChangeText={(text) => setEmailState(text)}
                              autoCompleteType={'email'}
                        ></TextInput>
                        <TextInput
                              label={'Password'}
                              secureTextEntry={true}
                              value={passwordState}
                              onChangeText={(text) => setPasswordState(text)}
                              textContentType={'password'}
                        ></TextInput>
                        <Button
                              title={'Login'}
                              mode={'contained'}
                              onPress={() => {
                                    setShowSpinnerState(true);
                                    loginUser(emailState, passwordState);
                              }}
                              loading={showSpinnerState}
                              style={styles.signupButton}
                        ></Button>
                        <Button title={'Signup'} mode={'text'} style={styles.loginButton} onPress={() => props.navigation.replace('Signup')}></Button>
                  </ScrollView>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      header: {
            marginTop: hp(10),
            marginBottom: hp(5),
            fontSize: 30,
            alignSelf: 'center',
      },
      loginButton: {
            alignSelf: 'center',
            marginTop: hp(5),
      },
      signupButton: {
            alignSelf: 'center',
            marginTop: hp(5),
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
            setToken: (token: string, userId: number) => {
                  dispatch({ type: 'SET_TOKEN', token, userId });
            },
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);
