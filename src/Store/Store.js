import {createStore, applyMiddleware} from 'redux';
import {allReducer} from './allReducer';
import logger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import Storage from '@react-native-async-storage/async-storage';
import createSaga from 'redux-saga';
import {SagaWacther} from './SagaWatcher';

const persistConfig = {
  key: 'Movie',
  storage: Storage,
};

const sagaMiddleWare = createSaga();

const persistedReducer = persistReducer(persistConfig, allReducer);

export const Store = createStore(
  persistedReducer,
  applyMiddleware(logger, sagaMiddleWare),
);

export const Persistor = persistStore(Store);

sagaMiddleWare.run(SagaWacther);
