import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../assets';
import { BackgroundContainer } from '../components/containers';
import { Text, Button } from '../components';

const editProfileScreen: FC = () => {
      const [showSpinnerState, setShowSpinnerState] = useState(false);

      return (
            <BackgroundContainer style={styles.container}>
                  <Text style={styles.text}>I am editProfileScreen</Text>
                  <Button
                        title={'Save'}
                        mode={'contained'}
                        loading={showSpinnerState}
                        onPress={() => {
                              setShowSpinnerState(true);
                              // todo save post here
                        }}
                  ></Button>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      text: {
            fontFamily: Fonts.regular,
            fontWeight: 'bold',
      },
});

export default editProfileScreen;
