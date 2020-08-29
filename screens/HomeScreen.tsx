import React, { useState, FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BackgroundContainer } from '../components/containers';
import { FloatingActionButton, Loading } from '../components';
import axios from '../axios';
import TweetList from '../components/TweetsList';
import { tweetType } from '../utils';
import { connect } from 'react-redux';

const HomeScreen: FC = (props: any) => {
      const [tweets, setTweets] = useState<tweetType[]>([]);
      const [pageNo, setPageNo] = useState<number>(1);
      const [fetchingFromServer, setFetchingFromServer] = useState<boolean>(true);

      useEffect(() => {
            const unsubscribe = props.navigation.addListener('focus', () => {
                  axios.get(`/tweets/${pageNo}`, { headers: { Authorization: `Bearer ${props.token}` } })
                        .then((result: any) => {
                              setFetchingFromServer(false);
                              setPageNo(pageNo + 1);
                              setTweets([...tweets, ...result.data.data]);
                        })
                        .catch((err: any) => console.log(err));
            });
            return unsubscribe;
      }, [props.navigation]);

      const loadMoreTweets = () => {
            setFetchingFromServer(true);
            axios.get(`/tweets/${pageNo}`, { headers: { Authorization: `Bearer ${props.token}` } })
                  .then((result: any) => {
                        setFetchingFromServer(false);
                        setPageNo(pageNo + 1);
                        setTweets([...tweets, ...result.data.data]);
                  })
                  .catch((err: any) => console.log(err));
      };

      if (!tweets) {
            return <Loading></Loading>;
      } else
            return (
                  <BackgroundContainer style={styles.container}>
                        <TweetList
                              tweetData={tweets}
                              navigation={props.navigation}
                              loading={fetchingFromServer}
                              loadMoreTweets={loadMoreTweets}
                        ></TweetList>
                        <FloatingActionButton
                              iconName={'feather'}
                              onPress={() => {
                                    props.navigation.navigate('NewPost');
                              }}
                        ></FloatingActionButton>
                  </BackgroundContainer>
            );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      text: {
            fontWeight: 'bold',
      },
});

const mapStateToProps = (state: any) => {
      return {
            token: state.token,
            userId: state.userId,
      };
};

const mapDispatchToProps = (dispatch: any) => {
      return {
            setToken: (token: string, userId: number) => {
                  dispatch({ type: 'SET_TOKEN', token, userId });
            },
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
