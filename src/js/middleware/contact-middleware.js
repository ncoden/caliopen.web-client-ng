import * as actions from '../action/action-types.js';
import { getNextOffset } from '../reducer/contact-reducer.js';

export function contactMiddleware(ContactsActions, FlashMessage) {
  'ngInject';

  return store => next => action => {
    if (action.type === actions.UPDATE_CONTACT) {
      FlashMessage.info(
        'Updating a contact is not yet available.'
        , { timeout: 10000 }
      );
    }

    const result = next(action);
    const requireContactRefreshActions = [
      actions.ADD_CONTACT_DETAIL_SUCCEEDED,
      actions.DELETE_CONTACT_DETAIL_SUCCEEDED,
    ];

    if (requireContactRefreshActions.indexOf(action.type) !== -1) {
      store.dispatch(ContactsActions.fetchContact(action.payload.contactId));
    }

    if (action.type === actions.LOAD_MORE_CONTACTS) {
      const offset = getNextOffset(store.getState().contactReducer);
      store.dispatch(ContactsActions.fetchContacts(offset));
    }

    return result;
  };
}
