import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Card} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import {getMovieAction, getAllMovieGenre} from './Redux/action';
import {Loading} from '../../Component/Component';
// Screen
const Home = props => {
  const [filterData, setfilterData] = useState('');
  const [datasGen, setDatasGen] = useState([]);
  const [search, setSearch] = useState('');

  const DataMovie = useSelector(state => {
    console.log(state, '<===== ini state');
    // ini aku tambahin untuk handling data pertama kali waktu masih null
    if (
      state.HomeReducer.data.results != null &&
      state.HomeReducer.data.results.length > 0
    ) {
      <Loading />;
      return state.HomeReducer.data.results;
    } else {
      return [];
    }
  });

  const searchFilter = text => {
    if (text) {
      const newData = datasGen2.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(datasGen2);
      setSearch(text);
    }
  };

  const dataGenre = useSelector(state => state.HomeReducer.dataGenre);
  const isLoading = useSelector(state => state.HomeReducer.isLoading);

  const dispatch = useDispatch();

  const datasGen2 = dataGenre.map((value, i) => {
    return {
      genreName: value.name,
      isSelected: false,
    };
  });
  console.log(datasGen, '<<<<===== ini genre nyaa');

  useEffect(() => {
    setDatasGen(datasGen2);
  }, [dataGenre.length]);

  useEffect(() => {
    dispatch(getAllMovieGenre());
    dispatch(getMovieAction());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getMovieAction());
  };

  const setActive = index => {
    setDatasGen(prevState => {
      prevState = datasGen2;
      prevState[index].isSelected = true;
      return prevState;
    });
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.SearchBarContainer}>
        <SearchBar
          placeholder="Search Movies"
          inputContainerStyle={{backgroundColor: 'white'}}
          leftIconContainerStyle={{backgroundColor: 'white'}}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={styles.SearchBar}
          round
          onChangeText={text => searchFilter(text)}
          value={search}
        />
      </View>
      <ScrollView
        style={styles.Container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <View style={styles.containerGenre}>
          <Text style={styles.TextBestGenre}>Best Genre</Text>

          <Text style={styles.ButonMore}>more &gt;&gt;</Text>
        </View>
        {isLoading && datasGen.length <= 0 ? (
          <Loading />
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.containerButtonGenre}>
              {datasGen.map((value, i) => {
                return (
                  <View key={i.toString()} style={styles.ContainerScrollButton}>
                    <TouchableOpacity
                      onPress={() => setActive(i)}
                      style={[
                        styles.ButtonGenre,
                        {
                          backgroundColor: value.isSelected
                            ? '#FFC200'
                            : 'white',
                        },
                      ]}>
                      <Entypo name="video" size={22} color="#000000" />
                      <Text style={styles.TextButton}>{value?.genreName}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}

        <View style={styles.ContainerTitle}>
          <Text style={styles.TitleGenre}>Hot Movies</Text>
          {isLoading ? (
            <Loading />
          ) : (
            <View>
              {DataMovie.filter(data =>
                data.title.toLowerCase().includes(search.toLowerCase()),
              )
                // ini filter untuk genre
                .filter(data =>
                  datasGen.every(value => value.isSelected === false)
                    ? true
                    : data.genres.filter(
                        v =>
                          v.toLowerCase() ===
                          datasGen
                            .find(value => value.isSelected === true)
                            .genreName.toLowerCase(),
                      ).length > 0,
                )
                .map((value, index) => {
                  return (
                    <TouchableOpacity
                      key={index.toString()}
                      onPress={() =>
                        props.navigation.navigate('HomeDetail', {
                          id: value._id,
                        })
                      }>
                      <Card containerStyle={styles.CardMovie}>
                        <Text style={styles.TextButton}>{value?.title}</Text>
                        <FastImage
                          style={styles.pic}
                          source={{
                            uri: `https://image.tmdb.org/t/p/original${value?.backdrop_path}`,
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                          style={styles.isi}
                          numberOfLines={4}
                          ellipsizeMode="tail">
                          {value.overview}
                        </Text>
                        <View style={styles.Line} />
                        <View style={styles.ButtonComSahare}>
                          <TouchableOpacity style={styles.ButtonCom}>
                            <Fontisto
                              name="commenting"
                              size={25}
                              color="#000000"
                            />
                            <Text style={styles.TextCom}> 123</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ButtonSha}>
                            <Foundation
                              name="share"
                              size={27}
                              color="#000000"
                            />
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  );
                })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#6E0301',
    height: heightPercentageToDP(91),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    padding: widthPercentageToDP(2),
  },
  SearchBarContainer: {
    paddingTop: moderateScale(1),
  },
  SearchBar: {
    height: moderateScale(70),
    backgroundColor: '#6E0302',
    justifyContent: 'space-around',
  },
  containerGenre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextBestGenre: {
    color: 'white',
    fontSize: moderateScale(20),
    fontFamily: 'Roboto-Bold',
  },
  ButonMore: {
    color: 'white',
  },
  containerButtonGenre: {
    paddingTop: heightPercentageToDP(2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ContainerScrollButton: {
    justifyContent: 'space-evenly',
    width: widthPercentageToDP(25),
  },
  ButtonGenre: {
    borderRadius: widthPercentageToDP(2),
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(22),
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  TextButton: {
    color: '#000000',
    fontFamily: 'Roboto-Bold',
  },

  ContainerTitle: {
    paddingTop: widthPercentageToDP(5),
  },
  TitleGenre: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(19),
  },
  CardMovie: {
    height: heightPercentageToDP(50),
    borderRadius: widthPercentageToDP(5),
    alignItems: 'center',
    flex: 1,
    padding: moderateScale(15),
  },
  pic: {
    flex: 1,
    alignSelf: 'center',
    height: heightPercentageToDP(22),
    width: widthPercentageToDP(78),
    padding: heightPercentageToDP(5),
  },
  // picplay: {
  //   width: moderateScale(40),
  //   height: moderateScale(40),
  // },

  playbutton: {
    paddingTop: moderateScale(100),
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  isi: {
    padding: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(12),
    letterSpacing: 1,
  },
  Line: {
    height: 1,
    backgroundColor: '#bfc0c0',
  },
  ButtonComSahare: {
    paddingTop: heightPercentageToDP(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonCom: {
    paddingLeft: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextCom: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(14),
  },
  ButtonSha: {
    paddingRight: moderateScale(20),
  },
});
