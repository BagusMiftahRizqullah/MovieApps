import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getReviews} from './Redux/action';
import {setAddReview} from '../Reviews/AddEditReview/Redux/action';

import {Overlay} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';
import {FAB} from 'react-native-paper';
import {AirbnbRating} from 'react-native-elements';
import {Avatar} from 'react-native-paper';

const Reviews = props => {
  const reviews = useSelector(state => {
    if (state.Reviews.reviews.length > 0) {
      return state.Reviews.reviews;
    } else {
      return [];
    }
  });

  const isLoading = useSelector(state => state.Reviews.isLoading);

  const UserReview = id => {
    props.navigation.navigate('UserReview', {id: id});
  };

  const onRefresh = () => {
    dispatch(getReviews());
  };

  // Review start here
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(0);

  const submitReview = () => {
    dispatch(
      setAddReview({
        title: title,
        message: message,
        rating: rate,
      }),
      toggleOverlay(),
    );
  };
  // Review end here

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.page}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        {reviews.map((value, index) => {
          if (value != null) {
            return (
              <TouchableOpacity
                key={value.id}
                onPress={() => {
                  UserReview(value.id);
                }}>
                <View style={styles.container}>
                  <View style={styles.content}>
                    <Avatar.Image
                      size={40}
                      style={styles.image}
                      source={{
                        uri: value.image,
                      }}
                    />
                    <View style={styles.containerTitle}>
                      <View style={styles.containerRating}>
                        <FontAwesome name="star" size={22} color="#f9c308" />
                        <Text>
                          <Text style={styles.contentRating}>
                            {value.rating}
                          </Text>
                          /10
                        </Text>
                        <Text style={styles.contentTitle}>{value.title}</Text>
                      </View>
                      <Text>
                        Reviewer:{' '}
                        <Text style={styles.contentUsername}>
                          {value.username}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.contentMessage}>{value.message}</Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            return <Text> Data kosong </Text>;
          }
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="#FAFFC2"
        onPress={toggleOverlay}
      />

      <Overlay
        style={stylesOverlay.overlay}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={stylesOverlay.container}>
          <Text style={stylesOverlay.header}>
            How do you think about this movie?
          </Text>
          <AirbnbRating
            style={stylesOverlay.rating}
            reviewSize={0}
            count={10}
            defaultRating={rate}
            size={20}
            onFinishRating={rating => setRate(rating)}
          />
          <Text style={stylesOverlay.subheader}>Your rating: {rate}</Text>
          <TextInput
            style={stylesOverlay.inputTitle}
            placeholder="Write a headline for your review here"
            onChangeText={input => setTitle(input)}
          />
          <TextInput
            style={stylesOverlay.inputMessage}
            multiline
            placeholder="Write your review here"
            onChangeText={input => setMessage(input)}
          />

          <Text onPress={submitReview} style={stylesOverlay.submit}>
            Submit
          </Text>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#000000',
    position: 'absolute',
    margin: 8,
    right: 0,
    bottom: 0,
  },
  page: {
    backgroundColor: '#6E0302',
    height: heightPercentageToDP(82),
    padding: 16,
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(20),
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
  },
  containerTitle: {
    flex: 9,
    marginStart: 16,
    flexDirection: 'column',
  },
  containerRating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentTitle: {
    marginStart: 8,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  contentUsername: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
  },
  contentMessage: {
    marginTop: 8,
    fontFamily: 'Roboto-Light',
  },
});

const stylesOverlay = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
    alignItems: 'center',
    backgroundColor: '#FFE7AB',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 20,
    paddingEnd: 20,
    margin: -16,
  },
  header: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  rating: {
    paddingVertical: 20,
  },
  subheader: {
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto-Bold',
  },
  inputTitle: {
    alignSelf: 'stretch',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontFamily: 'Roboto-Bold',
  },
  inputMessage: {
    alignSelf: 'stretch',
    marginTop: 10,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  submit: {
    fontFamily: 'Roboto-Bold',
    backgroundColor: '#000000',
    borderRadius: 10,
    color: '#FFFFFF',
    marginTop: 16,
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
