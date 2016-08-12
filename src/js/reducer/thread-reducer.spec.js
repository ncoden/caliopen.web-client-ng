import threadReducer from '../../../src/js/reducer/thread-reducer.js';
import * as actions from '../../../src/js/action/action-types.js';

describe('Reducer Thread Reducer', () => {
  const initialState = threadReducer();

  it('init state', () => {
    expect(initialState).toEqual({
      threadsById: {},
      messagesByThreadsId: {},
      isFetching: false,
      threads: [],
      totalThreads: 0,
    });
  });

  it('reduce RECEIVE_THREADS', () => {
    const action = {
      type: actions.RECEIVE_THREADS,
      payload: {
        threads: [
          { thread_id: 1, name: 'foo' },
          { thread_id: 2, name: 'bar' },
          { thread_id: 4, name: 'baz' },
        ],
      },
    };
    const state = threadReducer(initialState, action);
    expect(state.threadsById).toEqual({
      1: { thread_id: 1, name: 'foo' },
      2: { thread_id: 2, name: 'bar' },
      4: { thread_id: 4, name: 'baz' },
    });
    expect(state.threads).toEqual([1, 2, 4]);
  });

  it('reduce RECEIVE_THREAD', () => {
    const action = {
      type: actions.RECEIVE_THREAD,
      payload: {
        thread: { thread_id: 2, name: 'barbar' },
      },
    };
    const state = threadReducer(initialState, action);
    expect(state.threadsById).toEqual({
      2: { thread_id: 2, name: 'barbar' },
    });
    expect(state.threads).toEqual([]);
  });

  it('reduce RECEIVE_THREAD with living state', () => {
    const action = {
      type: actions.RECEIVE_THREAD,
      payload: {
        thread: { thread_id: 2, name: 'barbar' },
      },
    };
    const state = threadReducer({ ...initialState,
      threadsById: {
        1: { thread_id: 1, name: 'foo' },
        2: { thread_id: 2, name: 'bar' },
        4: { thread_id: 4, name: 'baz' },
      },
      threads: [1, 2, 4],
    }, action);
    expect(state.threadsById).toEqual({
      1: { thread_id: 1, name: 'foo' },
      2: { thread_id: 2, name: 'barbar' },
      4: { thread_id: 4, name: 'baz' },
    });
    expect(state.threads).toEqual([1, 2, 4]);
  });

  it('reduce RECEIVE_MESSAGES', () => {
    const action = {
      type: actions.RECEIVE_MESSAGES,
      payload: {
        threadId: 2,
        messages: [
          { message_id: 1, name: 'foo' },
          { message_id: 2, name: 'bar' },
          { message_id: 4, name: 'baz' },
        ],
      },
    };
    const state = threadReducer(initialState, action);
    expect(state.messagesByThreadsId).toEqual({
      2: [
        { message_id: 1, name: 'foo' },
        { message_id: 2, name: 'bar' },
        { message_id: 4, name: 'baz' },
      ],
    });
  });
});
