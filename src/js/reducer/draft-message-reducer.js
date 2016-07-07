import * as actions from '../action/action-types.js';

function messageReducer(state = {
  message_id: undefined,
  recipients: [],
  body: '',
}, action = {}) {
  switch (action.type) {
    case actions.CREATE_DRAFT_MESSAGE:
      return Object.assign({}, state, {
        message_id: action.messageId,
      });
    case actions.UPDATE_DRAFT_MESSAGE:
      return Object.assign({}, state, action.message);
    default:
      return state;
  }
}

function draftMessagesByIdReducer(state = {}, action = {}) {
  return Object.assign({}, state, {
    [action.messageId]: messageReducer(state[action.messageId], action),
  });
}

export function draftMessageReducer(state = {
  draftMessagesById: {},
}, action = {}) {
  switch (action.type) {
    case actions.CREATE_DRAFT_MESSAGE:
    case actions.UPDATE_DRAFT_MESSAGE:
      return Object.assign({}, state, {
        draftMessagesById: draftMessagesByIdReducer(state.draftMessagesById, action),
      });
    default:
      return state;
  }
}
