import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen, NewPostScreen, SignupScreen, LoginScreen, EditProfileScreen, TweetDetailScreen } from '../screens';
import HomeNavigator from './HomeNavigator';
import { Colors, Fonts } from '../assets';
import { Loading } from '../components';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const mainNavigator = (props: any) => {
      const [displayScreen, setDisplayScreen] = useState<string | undefined>(undefined);

      useEffect(() => {
            // check auth status
            AsyncStorage.multiGet(['token', 'userId'], (err, result) => {
                  if (err) {
                        return setDisplayScreen('Auth');
                  }
                  if (result && result[0][1]) {
                        props.setToken(result[0][1], result[1][1]);
                        setDisplayScreen('HomeNav');
                  } else {
                        setDisplayScreen('Auth');
                  }
            });
      }, []);

      const navigationOptions = {
            headerTransparent: true,
            title: '',
      };

      if (!displayScreen) {
            return <Loading></Loading>;
      }

      return (
            <NavigationContainer>
                  <Stack.Navigator initialRouteName={displayScreen}>
                        <Stack.Screen name="Auth" component={AuthScreen} options={navigationOptions} />
                        <Stack.Screen name="Signup" component={SignupScreen} options={navigationOptions} />
                        <Stack.Screen name="Login" component={LoginScreen} options={navigationOptions} />
                        <Stack.Screen name="HomeNav" component={HomeNavigator} options={navigationOptions} />
                        <Stack.Screen
                              name="NewPost"
                              component={NewPostScreen}
                              options={{
                                    title: 'New Tweet',
                                    headerStyle: {
                                          backgroundColor: '#14171A',
                                    },
                                    headerTitleStyle: {
                                          fontFamily: 'OpenSans-Regular',
                                    },
                                    headerTintColor: Colors.white,
                                    headerTitleAlign: 'center',
                              }}
                        />
                        <Stack.Screen
                              name="TweetDetail"
                              component={TweetDetailScreen}
                              options={{
                                    title: 'Tweet',
                                    headerStyle: {
                                          backgroundColor: '#14171A',
                                    },
                                    headerTitleStyle: {
                                          fontFamily: 'OpenSans-Regular',
                                    },
                                    headerTintColor: Colors.white,
                                    headerTitleAlign: 'center',
                              }}
                        />
                        <Stack.Screen
                              name="EditProfile"
                              component={EditProfileScreen}
                              options={{
                                    title: 'Edit Profile',
                                    headerStyle: {
                                          backgroundColor: '#14171A',
                                    },
                                    headerTitleStyle: {
                                          fontFamily: 'OpenSans-Regular',
                                    },
                                    headerTintColor: Colors.white,
                                    headerTitleAlign: 'center',
                              }}
                        />
                  </Stack.Navigator>
            </NavigationContainer>
      );
};

const mapDispatchToProps = (dispatch: any) => {
      return {
            setToken: (token: string, userId: number) => {
                  dispatch({ type: 'SET_TOKEN', token, userId });
            },
      };
};

export default connect(null, mapDispatchToProps)(mainNavigator);
