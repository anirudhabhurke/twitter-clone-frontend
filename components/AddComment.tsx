import React, { Component, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../assets';
import axios from '../axios';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

interface propTypes {
      tweetId: number;
      setRefreshing: Function;
      refreshing: boolean;
      token: string;
}

const AddComment: React.FC<propTypes> = (props) => {
      const [comment, setComment] = useState<string>('');

      const addComment = () => {
            if (!comment.replace(/\s/g, '').length) {
                  setComment('');
                  return;
            } else {
                  axios.post(
                        `/tweets/${props.tweetId}/new-comment`,
                        {
                              comment: comment,
                        },
                        { headers: { Authorization: `Bearer ${props.token}` } }
                  )
                        .then((result: any) => {
                              props.setRefreshing(!props.refreshing);
                              setComment('');
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            }
      };

      return (
            <View style={styles.surface}>
                  <KeyboardAvoidingView enabled behavior={'height'} style={styles.keyboardContainer}>
                        <TextInput
                              placeholder={'new comment'}
                              style={styles.taskInput}
                              placeholderTextColor={Colors.paleWhite}
                              value={comment}
                              onChangeText={(text) => {
                                    setComment(text);
                              }}
                        />
                        <TouchableOpacity onPress={addComment} style={styles.addButton}>
                              <MaterialIcons name={'send'} size={25} color={Colors.primary} />
                        </TouchableOpacity>
                  </KeyboardAvoidingView>
            </View>
      );
};

const styles = StyleSheet.create({
      surface: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.darkShade,
            borderTopWidth: 1,
            borderTopRightRadius: 10,
            bottom: 0,
            position: 'absolute',
            width: widthPercentageToDP(100),
      },
      keyboardContainer: {
            bottom: 0,
            backgroundColor: Colors.dark,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            padding: 0,
            marginVertical: 5,
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
      },
      taskInput: {
            fontFamily: 'OpenSans-Regular',
            fontSize: 18,
            paddingVertical: 5,
            width: '90%',
            color: Colors.white,
      },
      addButton: {
            height: 35,
            alignItems: 'center',
            flexGrow: 1,
            width: '5%',
            justifyContent: 'center',
      },
});

const mapStateToProps = (state: any) => {
      return {
            token: state.token,
      };
};

const mapDispatchToProps = (dispatch: any) => {
      return {
            setToken: (value: string) => {
                  dispatch({ type: 'SET_TOKEN', value: value });
            },
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
