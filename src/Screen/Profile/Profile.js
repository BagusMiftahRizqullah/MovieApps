import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Input} from 'react-native-elements';
import {IconProfile, IconEditButton} from '../../Assets/Assets';
import {ButtonAuth, Loading} from '../../Component/Component';
import {moderateScale} from 'react-native-size-matters';
import {getUserAction} from './Redux/action';

const Profile = props => {
  const dispatch = useDispatch();

  const dataUser = useSelector(state => state.UserReducer.data);
  const getUser = useSelector(state => state.UserReducer.getUser);
  const isLoading = useSelector(state => state.UserReducer.isLoading);
  const payload = useSelector(state => ({
    token: state.LoginReducer.data.token,
    id: state.LoginReducer.data.id,
  }));

  useEffect(() => {
    if (getUser === false) {
      dispatch(getUserAction(payload));
    }
  }, [getUser]);

  useEffect(() => {
    dispatch(getUserAction(payload));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.Container}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View style={styles.containerLogo}>
            <FastImage style={styles.logo} source={IconProfile} />
          </View>
          <View style={styles.FormRegis}>
            <Input
              value={dataUser?.fullName}
              style={styles.InputForm}
              placeholder="Name"
            />
            <Input
              value={dataUser?.userName}
              style={styles.InputForm}
              placeholder="Username"
            />
            <Input
              value={dataUser?.email}
              style={styles.InputForm}
              placeholder="Email"
            />
            <Input
              value={dataUser?.id}
              secureTextEntry
              style={styles.InputForm}
              placeholder="Password"
            />
            <View style={styles.ContainerButton}>
              <TouchableOpacity
                style={styles.ButtonLogout}
                onPress={() => {
                  dispatch({type: 'LOGOUT'});
                  props.navigation.navigate('Login');
                }}>
                <Text style={styles.textButtonLogout}>LOG OUT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.ButtonEditProfile}
                onPress={() => props.navigation.navigate('EditProfile')}>
                <Text style={styles.textButtonEdit}>EDIT PROFILE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#6E0301',
    height: heightPercentageToDP(84),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    padding: widthPercentageToDP(2),
  },
  containerLogo: {
    paddingTop: heightPercentageToDP(8),
    paddingBottom: heightPercentageToDP(2),
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: widthPercentageToDP(39),
    height: heightPercentageToDP(18),
  },
  editlogo: {
    position: 'absolute',
    width: moderateScale(40),
    height: moderateScale(40),
    right: 0,
    bottom: 0,
  },
  FormRegis: {
    padding: widthPercentageToDP(4),
    color: 'white',
  },
  InputForm: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
  ContainerButton: {
    alignItems: 'center',
    padding: heightPercentageToDP(3),
    paddingBottom: heightPercentageToDP(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ContainerTextLogin: {
    paddingTop: heightPercentageToDP(1),
    alignItems: 'center',
  },
  ButtonLogout: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: moderateScale(120),
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 11,
  },
  ButtonEditProfile: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: moderateScale(120),
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 11,
  },
  textButtonLogout: {
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonEdit: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  GoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextGoLogin: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});
