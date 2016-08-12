import { stateGo } from 'redux-ui-router';
import { v1 as uuidV1 } from 'uuid';

class DiscussionDraftService {
  constructor($ngRedux, DraftMessageActions, TabsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.DraftMessageActions = DraftMessageActions;
    this.TabsActions = TabsActions;
  }

  newDraft({ redirect } = { redirect: true }) {
    const messageId = uuidV1();
    this.$ngRedux.dispatch((dispatch) => {
      dispatch(this.DraftMessageActions.createDraftMessage(messageId));
      const tab = {
        type: 'draft-message',
        item: {
          message_id: messageId,
        },
      };
      dispatch(this.TabsActions.selectOrAdd(tab));
      if (redirect) {
        dispatch(stateGo('discussion-draft', { messageId }));
      }
    });
  }
}

export default DiscussionDraftService;
