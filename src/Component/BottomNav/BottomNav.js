import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
// Screen
import {Reviews, Home, Profile, EditProfile} from '../../Screen/Screen';

// Icon

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  IconHome,
  IconHomeActive,
  IconReview,
  IconReviewActive,
} from '../../Assets/Assets';

const Stack = createStackNavigator();
const Bot = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Bot.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#000000',
        style: {
          height: hp(10),
          borderTopWidth: 0,
          marginTop: 0,
          borderBottomColor: 'white',
        },
      }}>
      <Bot.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <FastImage
              source={focused ? IconReviewActive : IconReview}
              style={styles.icon}
            />
          ),
        }}
        name="Review"
        component={ReviewsStack}
      />
      <Bot.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <FastImage
              source={focused ? IconHomeActive : IconHome}
              style={styles.icon}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Bot.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <FontAwesome
              style={styles.icon}
              name="user-circle"
              size={22}
              color={color}
            />
          ),
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Bot.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerRight: () => {
            <TouchableOpacity>
              <Entypo name="check" size={20} color="white" />,
            </TouchableOpacity>;
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ReviewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All Review"
        component={Reviews}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});
