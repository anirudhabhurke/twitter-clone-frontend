import React, { useState, FC } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Colors, Fonts } from '../assets';
import { BackgroundContainer } from '../components/containers';
import axios from '../axios';
import { connect } from 'react-redux';

const NewPostScreen: FC = (props: any) => {
      const [postState, setPostState] = useState('');
      const [postUploadingState, setPostUploadingState] = useState(false);

      const postTweet = () => {
            if (postState.replace(/\s/g, '').length) {
                  setPostUploadingState(true);
                  axios.post(
                        `/tweets/${props.userId}`,
                        {
                              content: postState,
                        },
                        { headers: { Authorization: `Bearer ${props.token}` } }
                  )
                        .then(() => {
                              props.navigation.goBack();
                        })
                        .catch((err) => console.log(err));
            }
      };

      return (
            <BackgroundContainer style={styles.container}>
                  <TextInput
                        value={postState}
                        onChangeText={(input) => setPostState(input)}
                        multiline
                        style={styles.textInput}
                        placeholder={"What's happening?"}
                        placeholderTextColor={Colors.lightGrey}
                        editable={!postUploadingState}
                        autoFocus
                        maxLength={280}
                  ></TextInput>
                  <Button
                        dark
                        icon="feather"
                        mode="contained"
                        color={Colors.primary}
                        onPress={() => postTweet()}
                        style={styles.tweetButton}
                        loading={postUploadingState}
                  >
                        Tweet
                  </Button>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      textInput: {
            marginTop: 10,
            marginHorizontal: 20,
            fontSize: 25,
            fontFamily: Fonts.regular,
            flexGrow: 1,
            marginBottom: 50,
            color: Colors.white,
      },
      tweetButton: {
            fontSize: 10,
            color: Colors.white,
            width: '30%',
            alignSelf: 'center',
            marginBottom: 15,
            borderRadius: 30,
      },
});

const mapStateToProps = (state: any) => {
      return {
            token: state.token,
            userId: state.userId,
      };
};

export default connect(mapStateToProps, null)(NewPostScreen);
