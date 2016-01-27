import {combineReducers} from 'redux';
import {contactReducer} from './contact-reducer.js';
import {tabReducer} from './tab-reducer.js';
import {threadReducer} from './thread-reducer.js';
import {router} from 'redux-ui-router';

let reducers = combineReducers({
  router,
  contactReducer,
  tabReducer,
  threadReducer,
});

export default reducers;
