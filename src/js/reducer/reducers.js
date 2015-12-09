import {combineReducers} from 'redux';

function threadReducer(state = {
  isFetching: false,
  didInvalidate: false
}, action = {}) {
  switch(action.type) {
    case 'INVALIDATE_THREAD':
      return Object.assign({}, state, {
        didInvalidate: true,
        [action.threadId]: {
        }
      });
    case 'REQUEST_THREADS':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectedThread: undefined
      });
    case 'RECEIVER_THREADS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        threads: action.threads,
        totalThreads: action.total,
        lastUpdated: action.receivedAt
      });
    case 'REQUEST_MESSAGES':
      return Object.assign({}, state, {
        isFetchingMessages: true,
        selectedThread: action.threadId
      });
    case 'RECEIVER_MESSAGES':
      return Object.assign({}, state, {
        isFetchingMessages: false,
        [action.threadId]: {
          messages: action.messages
        }
      });
    default:
      return state;
  }
}

let reducers = combineReducers({ threadReducer });

export default reducers;
