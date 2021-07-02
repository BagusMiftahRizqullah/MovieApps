import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import {
  EditProfile,
  HomeDetail,
  Login,
  SignUp,
  AddEditReview,
  UserReview,
} from '../Screen/Screen';
// Component
import {BottomNav} from '../Component/Component';

const Stack = createStackNavigator();

const Router = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);

  const isLogin = useSelector(state => state.LoginReducer.isLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogin ? 'Mainapp' : 'Login'}>
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Mainapp"
          component={mainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeDetail"
          component={HomeDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEditReview"
          component={AddEditReview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserReview"
          component={UserReview}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mainApp = () => {
  return <BottomNav />;
};

export default Router;

const styles = StyleSheet.create({});
