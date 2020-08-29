import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem, TouchableNativeFeedback, RefreshControl } from 'react-native';
import { Colors, Fonts } from '../assets';
import { Text } from '../components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { SimpleLineIcons } from '@expo/vector-icons';
import { tweetType } from '../utils';

interface propsTypes {
      tweetData: tweetType[];
      navigation?: any;
      loading: boolean;
      loadMoreTweets: Function;
}

const relativeTime = (timestamp: string) => {
      let result = moment(timestamp).fromNow();
      return result;
};

const TweetList: React.FC<propsTypes> = (props) => {
      const ListEmptyComponent = (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(100) }}>
                  <SimpleLineIcons name={'social-twitter'} color={Colors.primary} size={40}></SimpleLineIcons>
                  <Text style={styles.emptyTweetsText}>Oh . .. Nothing here</Text>
            </View>
      );

      return (
            <FlatList<tweetType>
                  data={props.tweetData}
                  renderItem={({ item }: any) => {
                        return (
                              <TouchableNativeFeedback
                                    onPress={() => {
                                          props.navigation.navigate('TweetDetail', { tweet: item });
                                    }}
                              >
                                    <View style={styles.tweet}>
                                          <View style={styles.tweetHead}>
                                                <Text style={styles.userName}>{item['user.username']}</Text>
                                                <Text>{relativeTime(item.updatedAt)}</Text>
                                          </View>
                                          <Text style={styles.tweetText}>{item.content}</Text>
                                    </View>
                              </TouchableNativeFeedback>
                        );
                  }}
                  refreshControl={<RefreshControl refreshing={props.loading} />}
                  ListEmptyComponent={ListEmptyComponent}
                  onEndReached={() => {
                        props.loadMoreTweets();
                  }}
                  onEndReachedThreshold={0.2}
                  keyExtractor={(item) => item.id.toString()}
            />
      );
};

const styles = StyleSheet.create({
      tweet: {
            paddingVertical: hp(2),
            borderBottomColor: Colors.paleWhite,
            borderBottomWidth: 0.4,
      },
      tweetHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(3),
      },
      userName: {
            fontWeight: '700',
      },
      tweetText: {
            fontSize: 20,
            marginLeft: wp(5),
            marginVertical: hp(1),
      },
      emptyTweetsText: {
            fontSize: 30,
            marginTop: hp(5),
      },
});

export default TweetList;
