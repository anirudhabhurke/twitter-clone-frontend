import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Colors, Fonts } from '../assets';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInputProps } from 'react-native';

interface textInputProps extends TextInputProps {
      label: string | undefined;
      onChangeText: ((text: string) => void) & Function;
}

const textInput: FC<textInputProps> = (props) => {
      return (
            <TextInput
                  accessibilityStates={undefined}
                  label={props.label}
                  mode='outlined'
                  value={props.value}
                  onChangeText={(text) => props.onChangeText(text)}
                  selectionColor={Colors.primary}
                  style={styles.textInput}
                  autoCapitalize={'none'}
                  autoCompleteType={props.autoCompleteType}
                  secureTextEntry={props.secureTextEntry}
                  keyboardType={props.keyboardType}
                  textContentType={props.textContentType}
                  theme={{
                        colors: {
                              text: Colors.white,
                              placeholder: Colors.lightGrey,
                              primary: Colors.primary,
                        },
                  }}
            />
      );
};

const styles = StyleSheet.create({
      textInput: {
            backgroundColor: Colors.darkShade,
            borderColor: Colors.primary,
            marginHorizontal: wp(7),
            marginVertical: hp(1),
            fontFamily: Fonts.regular,
      },
});

export default textInput;
