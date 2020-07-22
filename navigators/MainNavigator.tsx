import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen, NewPostScreen, SignupScreen, LoginScreen, EditProfileScreen, TweetDetailScreen } from '../screens';
import { BackgroundContainer } from '../components/containers';
import HomeNavigator from './HomeNavigator';
import { Colors, Fonts } from '../assets';
import { Loading } from '../components';

const Stack = createStackNavigator();

const mainNavigator = () => {
      const [displayScreen, setDisplayScreen] = useState<string | undefined>(undefined);

      useEffect(() => {
            // check auth status
            setDisplayScreen('HomeNav');
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
                        <Stack.Screen name='Auth' component={AuthScreen} options={navigationOptions} />
                        <Stack.Screen name='Signup' component={SignupScreen} options={navigationOptions} />
                        <Stack.Screen name='Login' component={LoginScreen} options={navigationOptions} />
                        <Stack.Screen name='HomeNav' component={HomeNavigator} options={navigationOptions} />
                        <Stack.Screen
                              name='NewPost'
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
                              name='TweetDetail'
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
                              name='EditProfile'
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

export default mainNavigator;
