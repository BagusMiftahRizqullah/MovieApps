import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ButtonAuth} from '../../Component/Component';
import {Input} from 'react-native-elements';
import {Logo} from '../../Assets/Assets';
import {loginAction} from './Redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '../../Component/Component';

const Login = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    dispatch(
      loginAction({
        email: email,
        password: password,
      }),
    );
  };

  const isLogin = useSelector(state => state.LoginReducer.isLogin);

  useEffect(() => {
    if (isLogin) {
      props.navigation.navigate('Mainapp');
    }
  }, [isLogin]);

  const isLoading = useSelector(state => state.LoginReducer.isLoading);

  return (
    <SafeAreaView style={styles.Container}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View style={styles.containerLogo}>
            <FastImage
              style={styles.logo}
              source={Logo}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View style={styles.FormLogin}>
            <Input
              style={styles.InputForm}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
            <Input
              style={{color: 'white'}}
              secureTextEntry
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.ContainerForgetPws}>
              <TouchableOpacity>
                <Text style={styles.ForgetPws}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ContainerButtonSignIn}>
              <ButtonAuth
                action={submitLogin}
                text="SIGN IN"
                color={'#fff'}
                style={styles.Button}
              />
            </View>
          </View>
          <View>
            <View style={styles.ContainerTextSignup}>
              <View style={styles.GoSignup}>
                <Text style={styles.TextGoSignup}>
                  {' '}
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({type: 'RESET_AUTH'});
                    props.navigation.navigate('Signup');
                  }}>
                  <Text style={styles.TextGoSignup}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    height: heightPercentageToDP(100),
    backgroundColor: '#6E0301',
  },
  containerLogo: {
    paddingTop: heightPercentageToDP(8),
    paddingBottom: heightPercentageToDP(3),
    alignItems: 'center',
  },
  logo: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(25),
  },
  // ContainerJudul: {
  //   color: 'white',
  //   alignItems: 'center',
  // },

  // Judul: {
  //   color: 'white',
  //   fontSize: heightPercentageToDP(3),
  //   fontFamily: 'Schoolbell-Regular',
  // },
  FormLogin: {
    padding: widthPercentageToDP(4),
    color: 'white',
  },
  InputForm: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
  ContainerForgetPws: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ForgetPws: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  ButtonSignIn: {
    fontFamily: 'Roboto-Bold',
  },
  ContainerButtonSignIn: {
    alignItems: 'center',
    padding: heightPercentageToDP(5),
    paddingBottom: heightPercentageToDP(1),
  },
  ContainerTextSignup: {
    paddingTop: heightPercentageToDP(1),
    alignItems: 'center',
  },
  GoSignup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextGoSignup: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});
