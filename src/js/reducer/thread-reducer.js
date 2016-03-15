import * as actions from '../action/action-types.js';

function threadByIdReducer(state = {}, action = {}) {
  return action.threads.reduce(
    (previousState, thread) => Object.assign({}, previousState, { [thread.thread_id]: thread })
    , state
  );
}

function messagesByThreadsIdReducer(state = {}, action = {}) {
  return Object.assign({}, state, { [action.threadId]: action.messages });
}

export function threadReducer(state = {
  threadsById: {},
  messagesByThreadsId: {},
  isFetching: false,
  didInvalidate: false,
  threads: [],
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
        threads: action.threads.map(thread => thread.thread_id),
        threadsById: threadByIdReducer(state.threadsById, action),
        totalThreads: action.total,
        lastUpdated: action.receivedAt,
      });
    case actions.REQUEST_THREAD:
      return Object.assign({}, state, {
        isFetching: true,
        selectedThread: action.threadId,
      });
    case actions.RECEIVER_THREAD:
      return Object.assign({}, state, {
        isFetching: false,
        threadsById: threadByIdReducer(state.threadsById, { threads: [action.thread] }),
      });
    case actions.REQUEST_MESSAGES:
      return Object.assign({}, state, {
        isFetchingMessages: true,
        selectedThread: action.threadId,
      });
    case actions.RECEIVER_MESSAGES:
      return Object.assign({}, state, {
        isFetchingMessages: false,
        messagesByThreadsId: messagesByThreadsIdReducer(state.messagesByThreadsId, action),
      });
    default:
      return state;
  }
}
