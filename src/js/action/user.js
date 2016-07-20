import * as actions from './action-types.js';

export default class UserActions {

  constructor(UserRepository) {
    'ngInject';
    this.UserRepository = UserRepository;
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
}
