import {combineReducers} from 'redux';
import {contactReducer} from './contact-reducer.js';
import {tabReducer} from './tab-reducer.js';
import {threadReducer} from './thread-reducer.js';
import {userReducer} from './user-reducer.js';
import {router} from 'redux-ui-router';

let reducers = combineReducers({
  router,
  contactReducer,
  tabReducer,
  threadReducer,
  userReducer,
});

export default reducers;
