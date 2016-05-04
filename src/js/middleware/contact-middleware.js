import * as actions from '../action/action-types.js';

export function contactMiddleware(ContactsActions) {
  'ngInject';

  return store => next => action => {
    const result = next(action);
    const requireContactRefreshActions = [
      actions.ADD_CONTACT_DETAIL_SUCCEEDED,
      actions.DELETE_CONTACT_DETAIL_SUCCEEDED,
    ];

    if (requireContactRefreshActions.indexOf(action.type) !== -1) {
      store.dispatch(ContactsActions.fetchContact(action.contactId));
    }

    return result;
  };
}
