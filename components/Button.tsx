import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Colors, Fonts } from '../assets';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface buttonProps {
      icon?: any;
      mode: 'text' | 'outlined' | 'contained' | undefined;
      onPress: (() => void) | undefined;
      style?: object;
      loading?: boolean | undefined;
      title: string;
}

const button: FC<buttonProps> = (props) => (
      <Button
            dark
            icon={props.icon ? props.icon : ''}
            mode={props.mode}
            onPress={props.onPress}
            color={Colors.primary}
            style={{
                  ...styles.button,
                  ...props.style,
                  borderWidth: props.mode === 'outlined' ? 1 : 0,
            }}
            loading={props.loading}
      >
            {props.title}
      </Button>
);

const styles = StyleSheet.create({
      button: {
            borderRadius: 30,
            fontFamily: Fonts.regular,
            width: wp(40),
            borderColor: Colors.primary,
      },
});

export default button;
