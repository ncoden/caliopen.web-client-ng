import * as action from './action-types.js';

export class UserActions {

  constructor(UserRepository) {
    'ngInject';
    this.UserRepository = UserRepository;
  }

  requestUser() {
    return {
      type: action.REQUEST_USER
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
      type: action.RECEIVE_USER,
      user
    };
  }
}
