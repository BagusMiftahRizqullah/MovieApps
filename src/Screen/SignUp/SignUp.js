import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Input} from 'react-native-elements';
import {IconProfile, IconEditButton, Line} from '../../Assets/Assets';
import {ButtonAuth} from '../../Component/Component';
import {moderateScale} from 'react-native-size-matters';
import {Loading} from '../../Component/Component';
// Redux
import {useSelector, useDispatch} from 'react-redux';

// Action Signup
import {signupAction} from './Redux/action';
import {State} from 'react-native-gesture-handler';

const SignUp = props => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = () => {
    dispatch(
      signupAction({
        fullName: fullName,
        userName: username,
        email: email,
        password: password,
      }),
    );
  };

  const isSignup = useSelector(state => state.SignupReducer.isSignup);
  const isLoading = useSelector(state => state.SignupReducer.isLoading);
  useEffect(() => {
    if (isSignup) {
      props.navigation.navigate('Login');
    }
  }, [isSignup, props.navigation]);
  // KETIKA DATA Berubah di jalankan fungsi dalam use effect
  console.log(isSignup, '<<<<=== is signup');

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
              style={styles.InputForm}
              placeholder="Full Name"
              onChangeText={text => setFullName(text)}
            />
            <Input
              style={styles.InputForm}
              placeholder="Username"
              onChangeText={text => setUserName(text)}
            />
            <Input
              style={styles.InputForm}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
            <Input
              secureTextEntry
              style={styles.InputForm}
              onChangeText={text => setPassword(text)}
              placeholder="Password"
            />
            <View style={styles.ContainerButtonSignUp}>
              <ButtonAuth
                text="SIGN UP"
                color={'#000000'}
                style={styles.Button}
                action={submitData}
              />
            </View>
          </View>
          <View>
            <View style={styles.ContainerTextLogin}>
              <View style={styles.GoLogin}>
                <Text style={styles.TextGoLogin}>
                  {' '}
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text style={styles.TextGoLogin}> Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SignUp;

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
  ContainerButtonSignUp: {
    alignItems: 'center',
    padding: heightPercentageToDP(3),
    paddingBottom: heightPercentageToDP(1),
  },
  ContainerTextLogin: {
    paddingTop: heightPercentageToDP(1),
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
