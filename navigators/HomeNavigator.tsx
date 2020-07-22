import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../assets';
import { HomeScreen, ProfileScreen, NotificationScreen } from '../screens';

const Tab = createMaterialBottomTabNavigator();

const homeNavigator = () => {
      return (
            <Tab.Navigator
                  backBehavior={'initialRoute'}
                  initialRouteName={'Home'}
                  activeColor={Colors.primary}
                  inactiveColor={Colors.paleWhite}
                  barStyle={{
                        backgroundColor: Colors.dark,
                  }}
                  shifting
                  sceneAnimationEnabled={false}
            >
                  <Tab.Screen
                        name='Home'
                        component={HomeScreen}
                        options={{
                              tabBarIcon: ({ color }: any) => <AntDesign name={'home'} size={20} color={color}></AntDesign>,
                        }}
                  />
                  <Tab.Screen
                        name='Notification'
                        component={NotificationScreen}
                        options={{
                              tabBarIcon: ({ color }: any) => <AntDesign name={'notification'} size={20} color={color}></AntDesign>,
                        }}
                  />
                  <Tab.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={{
                              tabBarIcon: ({ color }: any) => <AntDesign name={'user'} size={20} color={color}></AntDesign>,
                        }}
                  />
            </Tab.Navigator>
      );
};

export default homeNavigator;
