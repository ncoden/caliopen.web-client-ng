import * as actions from './action-types.js';

export default class UserActions {

  constructor(UserRepository, ContactsActions) {
    'ngInject';
    this.UserRepository = UserRepository;
    this.ContactsActions = ContactsActions;
  }

  requestUser() {
    return {
      type: actions.REQUEST_USER,
      payload: {},
    };
  }

  fetchUser() {
    return dispatch => {
      dispatch(this.requestUser());

      return this.UserRepository.getUser().then(user => dispatch(this.receiveUser(user)));
    };
  }

  receiveUser(user) {
    return {
      type: actions.RECEIVE_USER,
      payload: { user },
    };
  }

  updateUserContact(contact) {
    return dispatch => {
      dispatch(this.ContactsActions.updateContact(contact));
      dispatch(this.invalidate());
    };
  }

  invalidate() {
    return {
      type: actions.INVALIDATE_USER,
      payload: {},
    };
  }
}
