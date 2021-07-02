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
import {getUserAction, editUserAction} from './Redux/action';

const EditProfile = props => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  //   const dataUser = useSelector(state => state.UserReducer.data);
  //   const payload = useSelector(state => ({
  //     token: state.LoginReducer.data.token,
  //     id: state.LoginReducer.data.id,
  //   }));

  const submitEdit = () => {
    dispatch(
      editUserAction({
        fullName: fullName,
        userName: userName,
        email: email,
        password: password,
        profile_pic: '',
      }),
    );
  };

  const isSuccess = useSelector(state => state.UserReducer.isSuccess);
  const isLoading = useSelector(state => state.UserReducer.isLoading);
  useEffect(() => {
    if (isSuccess) {
      props.navigation.navigate('Profile');
    }
  }, [isSuccess]);
  // console.log(userId, 'profile ambil');
  // const dataUser = useSelector(state => state.UserReduce.data);
  //   console.log(dataUser);
  return (
    <SafeAreaView style={styles.Container}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View style={styles.containerLogo}>
            <TouchableOpacity>
              <FastImage style={styles.logo} source={IconProfile} />
              <FastImage style={styles.editlogo} source={IconEditButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.FormRegis}>
            <Input
              onChangeText={input => setFullName(input)}
              style={styles.InputForm}
              placeholder="Name"
            />
            <Input
              onChangeText={input => setUserName(input)}
              style={styles.InputForm}
              placeholder="Username"
            />
            <Input
              onChangeText={input => setEmail(input)}
              style={styles.InputForm}
              placeholder="Email"
            />
            <Input
              onChangeText={input => setPassword(input)}
              secureTextEntry
              style={styles.InputForm}
              placeholder="Password"
            />
            <View style={styles.ContainerButtonEdit}>
              <ButtonAuth
                action={submitEdit}
                text="Save Data"
                color={'white'}
                style={styles.buttonEditProfile}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  Container: {
    height: heightPercentageToDP(100),
    backgroundColor: '#6E0301',
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
  ButtonSignUp: {
    fontFamily: 'Roboto-Bold',
  },
  ContainerButtonEdit: {
    alignItems: 'center',
    padding: heightPercentageToDP(3),
    paddingBottom: heightPercentageToDP(1),
  },
  ContainerTextLogin: {
    paddingTop: heightPercentageToDP(1),
    alignItems: 'center',
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  TextGoLogin: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});
