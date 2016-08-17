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
      const routeName = 'discussion-draft';
      const routeParams = {
        message_id: messageId,
      };
      dispatch(this.TabsActions.selectOrAdd({ routeName, routeParams }));
      if (redirect) {
        dispatch(stateGo(routeName, routeParams));
      }
    });
  }
}

export default DiscussionDraftService;
