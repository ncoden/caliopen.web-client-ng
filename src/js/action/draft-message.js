import * as action from './action-types.js';

export class DraftMessageActions {
  createDraftMessage(messageId) {
    return {
      type: action.CREATE_DRAFT_MESSAGE,
      messageId,
    };
  }

  updateDraftMessage(messageId, message) {
    return {
      type: action.UPDATE_DRAFT_MESSAGE,
      messageId,
      message,
    };
  }
}
