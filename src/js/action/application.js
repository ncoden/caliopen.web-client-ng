import * as action from './action-types.js';

export class ApplicationActions {
  selectApplication(application) {
    return {
      type: action.SELECT_APPLICATION,
      application
    };
  }

  requestApplication() {
    return {
      type: action.REQUEST_APPLICATION
    };
  }
}
