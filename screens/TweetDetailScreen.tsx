import React, { useState, FC, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';

import { Colors } from '../assets';
import { BackgroundContainer } from '../components/containers';
import { Text, Loading } from '../components';
import axios from '../axios';
import { tweetType, commentType } from '../utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AddComment from '../components/AddComment';
import { Feather } from '@expo/vector-icons';

const TweetDetailScreen: FC = (props: any) => {
      const [tweet, setTweet] = useState<tweetType | null>(null);
      const [comments, setComments] = useState<commentType[]>([]);
      const [refreshing, setRefreshing] = useState<boolean>(false);

      useEffect(() => {
            const unsubscribe = props.navigation.addListener('focus', () => {
                  const fetchedTweet = props.route.params.tweet;
                  setTweet(fetchedTweet);
                  axios.get(`/tweets/${fetchedTweet.id}/comments`)
                        .then((result: any) => {
                              setComments(result.data);
                        })
                        .catch((err: any) => console.log(err));
            });
            return unsubscribe;
      }, [props.navigation]);

      useEffect(() => {
            if (tweet) {
                  axios.get(`/tweets/${tweet.id}/comments`)
                        .then((result: any) => {
                              setComments(result.data);
                        })
                        .catch((err: any) => console.log(err));
            }
      }, [refreshing]);

      const likeTweet = () => {
            axios.patch(`/tweets/${tweet?.id}`)
                  .then((result: any) => {
                        if (result.status === 200) {
                              setTweet((prevTweet) => {
                                    if (prevTweet) {
                                          return {
                                                ...prevTweet,
                                                likes: prevTweet.likes + 1,
                                          };
                                    } else return null;
                              });
                        } else {
                              ToastAndroid.show('Error', ToastAndroid.SHORT);
                        }
                  })
                  .catch((error) => console.log(error));
      };
      const deleteTweet = () => {
            axios.delete(`/tweets/${tweet?.id}`)
                  .then((result: any) => {
                        if (result.status === 200) {
                              ToastAndroid.show('Deleted', ToastAndroid.SHORT);
                              props.navigation.goBack();
                        } else {
                              ToastAndroid.show('Error', ToastAndroid.SHORT);
                        }
                  })
                  .catch((error) => console.log(error));
      };

      const deleteComment = (commentId: number) => {
            axios.delete(`/tweets/${tweet?.id}/delete-comment/${commentId}`)
                  .then((result: any) => {
                        if (result.status === 200) {
                              ToastAndroid.show('Comment deleted', ToastAndroid.SHORT);
                              setRefreshing(!refreshing);
                        } else {
                              ToastAndroid.show('Error', ToastAndroid.SHORT);
                        }
                  })
                  .catch((error) => console.log(error));
      };

      const listComments = () => {
            if (comments.length === 0) {
                  return <Text style={styles.noCommentText}>No comments here...</Text>;
            } else {
                  return (
                        <FlatList<commentType>
                              data={comments}
                              renderItem={({ item }: any) => {
                                    return (
                                          <View style={styles.commentBody}>
                                                <Text style={styles.commentText}>{item.comment}</Text>
                                                <TouchableOpacity
                                                      onPress={() => {
                                                            deleteComment(item.id);
                                                      }}
                                                >
                                                      <Feather name={'trash-2'} color={Colors.grey} size={20}></Feather>
                                                </TouchableOpacity>
                                          </View>
                                    );
                              }}
                              keyExtractor={(item: any) => item.id.toString()}
                        />
                  );
            }
      };

      if (!tweet) {
            return (
                  <BackgroundContainer style={styles.container}>
                        <Loading></Loading>
                  </BackgroundContainer>
            );
      }
      return (
            <BackgroundContainer style={styles.container}>
                  <Text style={styles.tweetHeader}>{tweet.content}</Text>
                  <View style={styles.actionBar}>
                        <TouchableOpacity onPress={likeTweet}>
                              <View style={styles.likeView}>
                                    <Feather name={'heart'} color={'darkred'} size={25}></Feather>
                                    <Text style={styles.likeText}>{tweet.likes}</Text>
                              </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteTweet}>
                              <Feather name={'trash-2'} color={Colors.grey} size={25}></Feather>
                        </TouchableOpacity>
                  </View>
                  {listComments()}
                  <AddComment tweetId={tweet.id} refreshing={refreshing} setRefreshing={setRefreshing}></AddComment>
            </BackgroundContainer>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      tweetHeader: {
            fontSize: 30,
            marginVertical: hp(3),
      },
      noCommentText: {
            marginTop: hp(10),
            alignSelf: 'center',
      },
      commentBody: {
            paddingVertical: hp(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: Colors.lightGrey,
            paddingHorizontal: wp(2),
      },
      commentText: {
            fontSize: 18,
      },
      actionBar: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingVertical: hp(1),
            marginBottom: hp(4),
      },
      likeView: {
            flexDirection: 'row',
            alignItems: 'center',
      },
      likeText: {
            color: 'darkred',
            fontSize: 18,
            marginLeft: wp(2),
      },
});

export default TweetDetailScreen;
