import { combineReducers } from 'redux';
import { contactReducer } from './contact-reducer.js';
import { draftMessageReducer } from './draft-message-reducer.js';
import { tabReducer } from './tab-reducer.js';
import { threadReducer } from './thread-reducer.js';
import { userReducer } from './user-reducer.js';
import { router } from 'redux-ui-router';

const reducers = combineReducers({
  router,
  contactReducer,
  draftMessageReducer,
  tabReducer,
  threadReducer,
  userReducer,
});

export default reducers;
