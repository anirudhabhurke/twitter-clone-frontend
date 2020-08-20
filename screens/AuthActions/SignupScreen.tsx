import React, { useState, FC } from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { BackgroundContainer } from '../../components/containers';
import { Button, Text, TextInput } from '../../components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from '../../axios';

const signupScreen: FC = (props: any) => {
      const [usernameState, setUsernameState] = useState('');
      const [emailState, setEmailState] = useState('');
      const [passwordState, setPasswordState] = useState('');
      const [showSpinnerState, setShowSpinnerState] = useState(false);

      const signupUser = async (username: string, email: string, password: string) => {
            if (username.replace(/\s/g, '').length && email.replace(/\s/g, '').length && password) {
                  const user = {
                        username: usernameState,
                        email: emailState,
                        password: passwordState,
                  };
                  axios.post('/user/signup', user).then((response) => {
                        if (response.data.error) {
                              ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
                        } else if (response.data.message) {
                              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                              props.navigation.replace('Login');
                        }
                  });
            }
      };

      return (
            <BackgroundContainer style={styles.container}>
                  <ScrollView>
                        <Text style={styles.header}>Signup</Text>
                        <TextInput
                              label={'Username'}
                              value={usernameState}
                              onChangeText={(text) => setUsernameState(text)}
                              textContentType={'username'}
                        ></TextInput>
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
                              title={'Signup'}
                              mode={'contained'}
                              onPress={() => {
                                    setShowSpinnerState(true);
                                    signupUser(usernameState, emailState, passwordState);
                              }}
                              loading={showSpinnerState}
                              style={styles.signupButton}
                        ></Button>
                        <Button
                              title={'login'}
                              mode={'text'}
                              style={styles.loginButton}
                              onPress={() => {
                                    props.navigation.replace('Login');
                              }}
                        ></Button>
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
      signupButton: {
            alignSelf: 'center',
            marginTop: hp(5),
      },
      loginButton: {
            alignSelf: 'center',
            marginTop: hp(5),
      },
});

export default signupScreen;
