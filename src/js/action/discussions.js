import * as actions from './action-types.js';

export default class DiscussionsActions {
  constructor(ThreadRepository, MessageRepository) {
    'ngInject';
    this.ThreadRepository = ThreadRepository;
    this.MessageRepository = MessageRepository;
  }

  requestMessages(threadId) {
    return {
      type: actions.REQUEST_MESSAGES,
      payload: { threadId },
    };
  }

  receiveMessages(threadId, json) {
    return {
      type: actions.RECEIVE_MESSAGES,
      payload: {
        threadId,
        messages: json.messages,
        total: json.total,
        receiveAt: Date.now(),
      },
    };
  }

  requestThread(threadId) {
    return {
      type: actions.REQUEST_THREAD,
      payload: { threadId },
    };
  }

  receiveThread(threadId, json) {
    return {
      type: actions.RECEIVE_THREAD,
      payload: {
        threadId,
        thread: json.thread,
        receiveAt: Date.now(),
      },
    };
  }

  requestThreads() {
    return {
      type: actions.REQUEST_THREADS,
      payload: {},
    };
  }

  receiveThreads(json) {
    return {
      type: actions.RECEIVE_THREADS,
      payload: {
        threads: json.threads,
        total: json.total,
        receiveAt: Date.now(),
      },
    };
  }

  fetchThreads(offset = 0, limit = 20) {
    return dispatch => {
      dispatch(this.requestThreads(offset, limit));

      return this.ThreadRepository.findAll(offset, limit)
        .then(json => dispatch(this.receiveThreads(json)));
    };
  }

  loadMoreThreads() {
    return {
      type: actions.LOAD_MORE_THREADS,
      payload: {},
    };
  }

  fetchMessages(threadId) {
    return dispatch => {
      dispatch(this.requestMessages(threadId));
      this.MessageRepository.findByThreadId(threadId)
        .then(json => dispatch(this.receiveMessages(threadId, json)));
    };
  }

  fetchThread(threadId) {
    return dispatch => {
      dispatch(this.requestThread(threadId));
      this.ThreadRepository.find(threadId)
        .then(json => dispatch(this.receiveThread(threadId, json)));
    };
  }

  invalidateThreads() {
    return dispatch => {
      dispatch({
        type: actions.INVALIDATE_THREADS,
        payload: {},
      });
      dispatch(this.fetchThreads());
    };
  }
}
