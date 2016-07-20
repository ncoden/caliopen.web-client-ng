import * as actions from './action-types.js';

export default class DraftMessageActions {
  createDraftMessage(messageId) {
    return {
      type: actions.CREATE_DRAFT_MESSAGE,
      payload: { messageId },
    };
  }

  updateDraftMessage(messageId, message) {
    return {
      type: actions.UPDATE_DRAFT_MESSAGE,
      payload: {
        messageId,
        message,
      },
    };
  }
}
