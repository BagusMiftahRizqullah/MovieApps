import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Tombol = ({text, action, style}) => {
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Tombol;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: moderateScale(120),
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 11,
  },
  buttonEditProfile: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: moderateScale(120),
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 11,
  },

  textButton: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
