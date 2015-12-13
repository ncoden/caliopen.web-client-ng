import {combineReducers} from 'redux';
import {applicationReducer} from './application-reducer.js';
import {contactReducer} from './contact-reducer.js';
import {tabReducer} from './tab-reducer.js';
import {threadReducer} from './thread-reducer.js';

let reducers = combineReducers({
  applicationReducer,
  contactReducer,
  tabReducer,
  threadReducer,
});

export default reducers;
