import React, { useState, FC } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { BackgroundContainer } from '../../components/containers';
import { Button, Text, TextInput } from '../../components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const loginScreen: FC = (props: any) => {
      const [emailState, setEmailState] = useState('');
      const [passwordState, setPasswordState] = useState('');
      const [showSpinnerState, setShowSpinnerState] = useState(false);

      const loginUser = (email: string, password: string) => {};

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
                        <Button
                              title={'Signup'}
                              mode={'text'}
                              style={styles.loginButton}
                              onPress={() => props.navigation.replace('Signup')}
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
      loginButton: {
            alignSelf: 'center',
            marginTop: hp(5),
      },
      signupButton: {
            alignSelf: 'center',
            marginTop: hp(5),
      },
});

export default loginScreen;
