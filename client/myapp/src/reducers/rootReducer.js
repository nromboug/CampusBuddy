import {combineReducers} from '@reduxjs/toolkit';
import goalsReducer from './goalsReducer';
const rootReducer = combineReducers({
  goals: goalsReducer
});

export default rootReducer;