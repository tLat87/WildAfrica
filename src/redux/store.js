import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import levelsReducer from './slices/levelSlice';
import  settingsReducer from './slices/settingsSlice';

const rootReducer = combineReducers({
  levels: levelsReducer,
  settings: settingsReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
