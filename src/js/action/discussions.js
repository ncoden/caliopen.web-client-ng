import * as action from './action-types.js';

export class DiscussionsActions {
  constructor(ThreadRepository, MessageRepository) {
    'ngInject';
    this.ThreadRepository = ThreadRepository;
    this.MessageRepository = MessageRepository;
  }

  requestMessages(threadId) {
    return {
      type: action.REQUEST_MESSAGES,
      threadId,
    };
  }

  receiveMessages(threadId, json) {
    return {
      type: action.RECEIVER_MESSAGES,
      threadId,
      messages: json.messages,
      total: json.total,
      receiveAt: Date.now(),
    };
  }

  requestThread(threadId) {
    return {
      type: action.REQUEST_THREAD,
      threadId,
    };
  }

  receiveThread(threadId, json) {
    return {
      type: action.RECEIVER_THREAD,
      threadId,
      thread: json.thread,
      receiveAt: Date.now(),
    };
  }

  requestThreads() {
    return {
      type: action.REQUEST_THREADS,
    };
  }

  receiveThreads(json) {
    return {
      type: action.RECEIVER_THREADS,
      threads: json.threads,
      total: json.total,
      receiveAt: Date.now(),
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
      type: action.LOAD_MORE_THREADS,
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
}
