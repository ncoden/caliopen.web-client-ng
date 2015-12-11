import {combineReducers} from 'redux';
import {threadReducer} from './thread-reducer.js';
import {contactReducer} from './contact-reducer.js';

let reducers = combineReducers({ threadReducer, contactReducer });

export default reducers;
