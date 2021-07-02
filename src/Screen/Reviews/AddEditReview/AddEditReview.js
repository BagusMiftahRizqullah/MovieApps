import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View, TextInput} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setAddEditReview} from './Redux/action';

import {useDispatch, useSelector} from 'react-redux';

const AddEditReview = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch();
  const Rating = useSelector(state => {
    if (state.AddEditReducer.rating != null) {
      return state.AddEditReducer.rating;
    } else {
      return null;
    }
  });

  const submitReview = () => {
    dispatch(
      setAddEditReview({
        title: title,
        message: message,
        rating: rate,
      }),
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>How do you think about this movie?</Text>
        <AirbnbRating
          style={styles.rating}
          reviewSize={0}
          count={10}
          defaultRating={rate}
          size={20}
          onFinishRating={rating => setRate(rating)}
        />
        <Text style={styles.subheader}>Your rating: {rate}</Text>
        <TextInput
          style={styles.inputTitle}
          placeholder="Write a headline for your review here"
          onChangeText={input => setTitle(input)}
        />
        <TextInput
          style={styles.inputMessage}
          multiline
          placeholder="Write your review here"
          onChangeText={input => setMessage(input)}
        />
        <TouchableOpacity onPress={submitReview}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddEditReview;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFE7AB',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 30,
    paddingEnd: 30,
    margin: 16,
  },
  header: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  rating: {
    paddingVertical: 20,
  },
  subheader: {
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  inputTitle: {
    alignSelf: 'stretch',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  inputMessage: {
    alignSelf: 'stretch',
    marginTop: 10,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  submit: {
    backgroundColor: '#000000',
    borderRadius: 10,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 16,
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
