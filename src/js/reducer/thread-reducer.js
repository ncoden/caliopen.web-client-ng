import * as actions from '../action/action-types.js';

function threadByIdReducer(state = {}, action = {}) {
  return action.payload.threads.reduce(
    (previousState, thread) => Object.assign({}, previousState, { [thread.thread_id]: thread })
    , state
  );
}

function messagesByThreadsIdReducer(state = {}, action = {}) {
  return { ...state, [action.payload.threadId]: action.payload.messages };
}

function threadIdsReducer(state = [], action = {}) {
  if (action.type === actions.RECEIVE_THREADS) {
    const threadIds = state.slice();

    return threadIds
      .concat(action.payload.threads.map(thread => thread.thread_id))
      .reduce((prev, curr) => {
        if (prev.indexOf(curr) === -1) {
          prev.push(curr);
        }

        return prev;
      }, []);
  }

  return state;
}

export function hasMore(state) {
  return state.totalThreads > state.threads.length;
}

export function getNextOffset(state) {
  return state.threads.length;
}

export default function threadReducer(state = {
  threadsById: {},
  messagesByThreadsId: {},
  isFetching: false,
  threads: [],
  totalThreads: 0,
  didInvalidate: false,
}, action = {}) {
  switch (action.type) {
    case actions.REQUEST_THREADS:
      return {
        ...state,
        isFetching: true,
        selectedThread: undefined,
      };
    case actions.RECEIVE_THREADS:
      return { ...state,
        isFetching: false,
        threads: threadIdsReducer(
          state.didInvalidate === true ? [] : state.threads,
          action
        ),
        threadsById: threadByIdReducer(
          state.didInvalidate === true ? {} : state.threadsById,
          action
        ),
        totalThreads: action.payload.total,
        lastUpdated: action.payload.receivedAt,
        didInvalidate: false,
      };
    case actions.REQUEST_THREAD:
      return { ...state,
        isFetching: true,
        selectedThread: action.payload.threadId,
      };
    case actions.RECEIVE_THREAD:
      return { ...state,
        isFetching: false,
        threadsById: threadByIdReducer(
          state.threadsById,
          { payload: { threads: [action.payload.thread] } }
        ),
      };
    case actions.REQUEST_MESSAGES:
      return { ...state,
        isFetchingMessages: true,
        selectedThread: action.payload.threadId,
      };
    case actions.RECEIVE_MESSAGES:
      return { ...state,
        isFetchingMessages: false,
        messagesByThreadsId: messagesByThreadsIdReducer(state.messagesByThreadsId, action),
      };
    case actions.INVALIDATE_THREADS:
      return {
        ...state,
        didInvalidate: true,
      };
    case actions.THREAD_NOT_FOUND:
      return {
        ...state,
        isFetching: false,
        threadsById: Object.keys(state.threadsById)
          .filter(id => id !== action.payload.threadId)
          .reduce((prev, id) => ({ ...prev, [id]: state.threadsById[id] }), {}),
        threads: state.threads.filter(id => id !== action.payload.threadId),
      };
    default:
      return state;
  }
}
