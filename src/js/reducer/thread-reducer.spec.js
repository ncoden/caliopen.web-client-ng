import threadReducer from './thread-reducer.js';
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
      didInvalidate: false,
    });
  });

  describe('reduce RECEIVE_THREADS', () => {
    it('on an empty state', () => {
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

    it('on an invalidated state ', () => {
      const livingState = threadReducer(threadReducer(initialState, {
        type: actions.RECEIVE_THREADS,
        payload: {
          threads: [
            { thread_id: 1, name: 'foo' },
            { thread_id: 2, name: 'bar' },
          ],
        },
      }), {
        type: actions.INVALIDATE_THREADS,
        payload: {},
      });

      const action = {
        type: actions.RECEIVE_THREADS,
        payload: {
          threads: [
            { thread_id: 5, name: 'foo' },
            { thread_id: 7, name: 'bar' },
            { thread_id: 8, name: 'baz' },
          ],
        },
      };
      const state = threadReducer(livingState, action);
      expect(state.threadsById).toEqual({
        5: { thread_id: 5, name: 'foo' },
        7: { thread_id: 7, name: 'bar' },
        8: { thread_id: 8, name: 'baz' },
      });
      expect(state.threads).toEqual([5, 7, 8]);
      expect(state.didInvalidate).toBe(false);
    });
  });

  describe('reduce RECEIVE_THREAD', () => {
    it('on an empty state', () => {
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

    it('on a living state', () => {
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

  it('reduce INVALIDATE_THREADS', () => {
    const livingState = threadReducer(initialState, {
      type: actions.RECEIVE_THREADS,
      payload: {
        threads: [
          { thread_id: 1, name: 'foo' },
          { thread_id: 2, name: 'bar' },
        ],
      },
    });

    const action = {
      type: actions.INVALIDATE_THREADS,
      payload: {},
    };

    const state = threadReducer(livingState, action);
    expect(state.didInvalidate).toBe(true);
    expect(state.threadsById).toEqual({
      1: { thread_id: 1, name: 'foo' },
      2: { thread_id: 2, name: 'bar' },
    });
    expect(state.threads).toEqual([1, 2]);
  });

  describe('reduce THREAD_NOT_FOUND', () => {
    it('reduce known id', () => {
      const livingState = threadReducer(initialState, {
        type: actions.RECEIVE_THREADS,
        payload: {
          threads: [
            { thread_id: '1', name: 'foo' },
            { thread_id: '2', name: 'bar' },
            { thread_id: '4', name: 'baz' },
          ],
        },
      });

      const action = {
        type: actions.THREAD_NOT_FOUND,
        payload: { threadId: '2' },
      };
      const state = threadReducer({ ...livingState, isFetching: true }, action);
      expect(state.isFetching).toEqual(false);
      expect(state.threadsById).toEqual({
        1: { thread_id: '1', name: 'foo' },
        4: { thread_id: '4', name: 'baz' },
      });
      expect(state.threads.sort()).toEqual(['1', '4']);
    });

    it('reduce unknown id', () => {
      const livingState = threadReducer(initialState, {
        type: actions.RECEIVE_THREADS,
        payload: {
          threads: [
            { thread_id: '1', name: 'foo' },
            { thread_id: '2', name: 'bar' },
            { thread_id: '4', name: 'baz' },
          ],
        },
      });

      const action = {
        type: actions.THREAD_NOT_FOUND,
        payload: { threadId: '3' },
      };
      const state = threadReducer({ ...livingState, isFetching: true }, action);
      expect(state.isFetching).toEqual(false);
      expect(state.threadsById).toEqual({
        1: { thread_id: '1', name: 'foo' },
        2: { thread_id: '2', name: 'bar' },
        4: { thread_id: '4', name: 'baz' },
      });
      expect(state.threads.sort()).toEqual(['1', '2', '4']);
    });
  });
});
