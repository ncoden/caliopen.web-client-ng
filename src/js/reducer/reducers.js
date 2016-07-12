import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import applicationReducer from './application-reducer.js';
import contactReducer from './contact-reducer.js';
import draftMessageReducer from './draft-message-reducer.js';
import tabReducer from './tab-reducer.js';
import threadReducer from './thread-reducer.js';
import userReducer from './user-reducer.js';

const reducers = combineReducers({
  router,
  applicationReducer,
  contactReducer,
  draftMessageReducer,
  tabReducer,
  threadReducer,
  userReducer,
});

export default reducers;
