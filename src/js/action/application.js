import * as actions from './action-types.js';

export default class ApplicationActions {
  switchApplication(applicationName) {
    return {
      type: actions.SWITCH_APPLICATION,
      payload: { applicationName },
    };
  }
}
