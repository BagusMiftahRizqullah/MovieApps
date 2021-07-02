import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Store} from './src/Store/Store';
import {Provider} from 'react-redux';
import Router from './src/Router/Router';

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
