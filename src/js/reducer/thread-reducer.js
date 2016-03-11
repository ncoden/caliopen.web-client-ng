import * as actions from '../action/action-types.js';

export function threadReducer(state = {
  isFetching: false,
  didInvalidate: false,
}, action = {}) {
  switch (action.type) {
    case actions.REQUEST_THREADS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectedThread: undefined,
      });
    case actions.RECEIVER_THREADS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        threads: action.threads,
        totalThreads: action.total,
        lastUpdated: action.receivedAt,
      });
    case actions.REQUEST_MESSAGES:
      return Object.assign({}, state, {
        isFetchingMessages: true,
        selectedThread: action.threadId,
      });
    case actions.RECEIVER_MESSAGES:
      return Object.assign({}, state, {
        isFetchingMessages: false,
        [action.threadId]: {
          messages: action.messages,
        },
      });
    default:
      return state;
  }
}
