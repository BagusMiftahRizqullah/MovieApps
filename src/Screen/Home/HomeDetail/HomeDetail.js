import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Overlay, SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getMovieDetail} from './Redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {setAddReview} from '../../Reviews/AddEditReview/Redux/action';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';
import {Avatar} from 'react-native-paper';
import {AirbnbRating} from 'react-native-elements';
import Loading from '../../../Component/Loading/Loading';

import {
  PlayButton,
  IconReview,
  IconShare,
  IconHomeActive,
} from '../../../Assets/Assets';

const HomeDetail = props => {
  const Movie = useSelector(state => {
    if (state.HomeDetail.movie != null) {
      return state.HomeDetail.movie;
    } else {
      return null;
    }
  });
  const isLoading = useSelector(state => state.HomeDetail.isLoading);

  const movieID = props.route.params.id;

  //Search start here
  const [search, setSearch] = useState('');
  //Searh end here

  //Navigation start here
  const goReview = () => {
    props.navigation.navigate('Review');
  };

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };
  //Navigation end here

  // Review start here
  const Rating = useSelector(state => {
    if (state.AddEditReducer.rating != null) {
      return state.AddEditReducer.rating;
    } else {
      return null;
    }
  });
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(0);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const submitReview = () => {
    dispatch(
      setAddReview({
        movieID: movieID,
        userID: 'testing',
        title: title,
        message: message,
        rating: rate,
      }),
      toggleOverlay(),
    );
  };
  // Review end here

  const openTrailer = url => {
    Linking.openURL(url);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetail(movieID));
  }, [dispatch, movieID]);

  console.log(Movie, '<<<<< Data Movie Detail');

  return (
    <SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.page}>
          <SearchBar
            inputContainerStyle={styles.searchInputContainer}
            containerStyle={styles.searchContainer}
            placeholder="Search movies"
            onChangeText={input => {
              setSearch(input);
            }}
            value={search}
          />
          <View style={styles.container}>
            <View style={styles.containerPoster}>
              <FastImage
                style={styles.posterImage}
                source={{
                  uri: Movie.posterImage,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <View style={styles.containerIconPlay}>
                <TouchableOpacity onPress={() => openTrailer(Movie.trailer)}>
                  <FastImage style={styles.iconPlay} source={PlayButton} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.movieTitle}>{Movie.title}</Text>
              <Text style={styles.movieTitle}>
                {Movie.year} | {Movie.genre}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.containerDescription}>
              <FastImage
                style={styles.descriptionImage}
                source={{
                  uri: Movie.descImage,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <View style={styles.containerDetail}>
                <View style={styles.containerRating}>
                  <TouchableOpacity style={styles.contentRating}>
                    <FontAwesome name="star" size={20} color="#f9c308" />
                    <Text>{Movie.rating}/10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.contentRating}
                    onPress={toggleOverlay}>
                    <FontAwesome name="star" size={20} color="#979797" />
                    <Text>Rate This</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.contentDetail}>{Movie.description}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.containerFooter}>
              <TouchableOpacity
                onPress={toggleOverlay}
                style={styles.contentFooterReview}>
                <FastImage
                  style={styles.iconDetail}
                  source={IconReview}
                  size={50}
                />
                <Text style={styles.textCountReview}>{Movie.totalReview}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <FastImage
                  style={styles.iconDetail}
                  source={IconShare}
                  size={50}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <Appbar style={styles.bottom}>
        <TouchableOpacity onPress={goReview}>
          <FastImage style={styles.icon} source={IconReview} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goHome}>
          <FastImage style={styles.icon} source={IconHomeActive} />
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

export default HomeDetail;

const styles = StyleSheet.create({
  page: {
    height: heightPercentageToDP(90),
    backgroundColor: '#6E0301',
    position: 'absolute',
    top: 0,
    start: 0,
    end: 0,
    padding: 20,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  iconDetail: {
    width: 16,
    height: 16,
  },
  icon: {
    width: 22,
    height: 22,
  },
  bottom: {
    height: heightPercentageToDP(10),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: -heightPercentageToDP(100),
    start: 0,
    end: 0,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 8,
  },
  searchInputContainer: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 16,
  },
  containerPoster: {
    flex: 1,
    height: heightPercentageToDP(25),
  },
  posterImage: {
    justifyContent: 'center',
    height: heightPercentageToDP(25),
  },
  containerIconPlay: {
    justifyContent: 'center',
    top: -heightPercentageToDP(25),
    height: heightPercentageToDP(25),
  },
  iconPlay: {
    alignSelf: 'center',
    width: moderateScale(40),
    height: moderateScale(40),
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitle: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 8,
    marginBottom: 8,
    height: 1,
    backgroundColor: '#bfc0c0',
  },
  containerDescription: {
    flex: 1,
    flexDirection: 'row',
  },
  containerDetail: {
    flex: 2,
    flexDirection: 'column',
    marginStart: 16,
  },
  descriptionImage: {
    width: 120,
    height: 160,
  },
  containerRating: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentRating: {
    marginStart: 8,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDetail: {
    flex: 1,
    textAlign: 'justify',
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentFooterReview: {
    flex: 1,
    flexDirection: 'row',
  },
  textCountReview: {
    marginStart: 6,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
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
