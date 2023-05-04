import {combineReducers} from '@reduxjs/toolkit';
import goalsReducer from './goalsReducer';
import todoReduer from './todoReducer';
const rootReducer = combineReducers({
  goals: goalsReducer,
  todo: todoReduer
});

export default rootReducer;