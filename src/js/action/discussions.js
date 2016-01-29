import * as action from './action-types.js';

export class DiscussionsActions {
  constructor(ThreadRepository, MessageRepository) {
    'ngInject';
    this.ThreadRepository = ThreadRepository;
    this.MessageRepository = MessageRepository;
  }

  selectThread(threadId) {
    return {
      type: action.SELECT_THREAD,
      threadId
    };
  }

  requestMessages(threadId) {
    return {
      type: action.REQUEST_MESSAGES,
      threadId
    };
  }

  receiveMessages(threadId, json) {
    return {
      type: action.RECEIVER_MESSAGES,
      threadId,
      messages: json.messages,
      total: json.total,
      receiveAt: Date.now()
    };
  }

  requestThreads() {
    return {
      type: action.REQUEST_THREADS
    };
  }

  receiveThreads(json) {
    return {
      type: action.RECEIVER_THREADS,
      threads: json.threads,
      total: json.total,
      receiveAt: Date.now()
    };
  }

  fetchThreads() {
    return dispatch => {
      dispatch(this.requestThreads());
      return this.ThreadRepository.findAll()
        .then(json => dispatch(this.receiveThreads(json)));
    };
  }

  fetchMessages(threadId) {
    return dispatch => {
      dispatch(this.requestMessages(threadId));
      this.MessageRepository.findByThreadId(threadId)
        .then(json => dispatch(this.receiveMessages(threadId, json)));
    };
  }
}
