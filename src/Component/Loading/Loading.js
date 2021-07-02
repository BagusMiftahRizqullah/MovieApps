import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size={moderateScale(40)} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(100),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
