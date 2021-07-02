import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getUserReviews, userSubmitReview} from './Redux/action';
import Loading from '../../../Component/Loading/Loading';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';
import {Avatar} from 'react-native-paper';
import {AirbnbRating} from 'react-native-elements';
import {
  setEditReview,
  deleteReview,
} from '../../Reviews/AddEditReview/Redux/action';

import {
  IconEditButton,
  IconHome,
  IconRemoveButton,
  IconReviewActive,
} from '../../../Assets/Assets';
import {Store} from '../../../Store/Store';

const UserReview = props => {
  const userReview = useSelector(state => {
    if (state.UserReview.userReview.length > 0) {
      return state.UserReview.userReview;
    } else {
      return [];
    }
  });

  const isEdited = useSelector(state => state.UserReview.isEdited);
  const isDeleted = useSelector(state => state.UserReview.isDeleted);
  const isLoading = useSelector(state => state.UserReview.isLoading);

  const reviewID = props.route.params.id;

  const dispatch = useDispatch();

  const goReview = () => {
    props.navigation.navigate('Review');
  };

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };

  //Rating start here
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(0);

  const toggleOverlay = review => {
    if (review != null) {
      setTitle(review.title);
      setMessage(review.message);
      setRate(review.rating);
    }
    setVisible(!visible);
  };

  const submitReview = () => {
    dispatch(userSubmitReview());
    dispatch(
      setEditReview({
        reviewID: reviewID,
        movieID: userReview[0].movieID,
        userID: userReview[0].userID,
        title: title,
        message: message,
        rating: rate,
      }),
      toggleOverlay(),
    );
  };
  //Rating end here

  //delete review
  const actionDeleteReview = () => {
    dispatch(userSubmitReview());
    dispatch(deleteReview({reviewID: reviewID}));
  };

  useEffect(() => {
    dispatch(getUserReviews(reviewID));
    if (isEdited) {
      dispatch(getUserReviews(reviewID));
    }

    if (isDeleted) {
      Store.getState().UserReview.isLoading = true;
      Store.getState().UserReview.isEdited = false;
      Store.getState().UserReview.isDeleted = false;

      props.navigation.goBack();
    }
  }, [dispatch, isDeleted, isEdited, props.navigation, reviewID]);

  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goReview} color="#FFFFFF" />
        <Appbar.Content title="Your Reviews" color="#FFFFFF" />
      </Appbar.Header>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.page}>
          {userReview.map((value, index) => {
            return (
              <View style={styles.container} key={index}>
                <View style={styles.content}>
                  <FastImage
                    style={styles.image}
                    source={{
                      uri: value.image,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <View style={styles.containerTitle}>
                    <Text style={styles.contentMovieTitle}>
                      {value.movie} ({value.year})
                    </Text>
                    <Text>Reviewed {value.date}</Text>
                    <View style={styles.containerRating}>
                      <FontAwesome name="star" size={20} color="#f9c308" />
                      <Text>
                        <Text style={styles.contentRating}>{value.rating}</Text>
                        /10
                      </Text>
                    </View>
                    <View style={styles.containerAction}>
                      <TouchableOpacity onPress={() => toggleOverlay(value)}>
                        <FastImage
                          style={styles.icon}
                          source={IconEditButton}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={actionDeleteReview}>
                        <FastImage
                          style={[styles.icon, styles.iconAction]}
                          source={IconRemoveButton}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text style={styles.contentTitle}>{value.title}</Text>
                <Text style={styles.contentMessage}>{value.message}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      <Appbar style={styles.bottom}>
        <TouchableOpacity onPress={goReview}>
          <FastImage style={styles.icon} source={IconReviewActive} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goHome}>
          <FastImage style={styles.icon} source={IconHome} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goProfile}>
          <Avatar.Image
            style={styles.icon}
            size={22}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
            }}
          />
        </TouchableOpacity>
      </Appbar>
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
            value={rate}
          />
          <Text style={stylesOverlay.subheader}>Your rating: {rate}</Text>
          <TextInput
            style={stylesOverlay.inputTitle}
            placeholder="Write a headline for your review here"
            onChangeText={input => setTitle(input)}
            value={title}
          />
          <TextInput
            style={stylesOverlay.inputMessage}
            multiline
            placeholder="Write your review here"
            onChangeText={input => setMessage(input)}
            value={message}
          />

          <Text onPress={submitReview} style={stylesOverlay.submit}>
            Submit
          </Text>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default UserReview;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#6E0301',
    height: heightPercentageToDP(80),
    top: 0,
    start: 0,
    end: 0,
    padding: 20,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  icon: {
    width: 22,
    height: 22,
  },
  header: {
    backgroundColor: '#000000',
    height: heightPercentageToDP(10),
    top: 0,
    start: 0,
    end: 0,
  },
  bottom: {
    height: heightPercentageToDP(10),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: -heightPercentageToDP(10),
    start: 0,
    end: 0,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 120,
  },
  containerTitle: {
    flex: 9,
    marginStart: 16,
    flexDirection: 'column',
  },
  containerRating: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
  },
  containerAction: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
  },
  contentMovieTitle: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginBottom: 4,
    fontSize: 18,
  },
  iconAction: {
    marginStart: 16,
  },
  contentRating: {
    marginStart: 12,
    fontFamily: 'Roboto-Bold',
  },
  contentTitle: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
  },
  contentMessage: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'justify',
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
