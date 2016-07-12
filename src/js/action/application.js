import * as actions from './action-types.js';

export default class ApplicationActions {

  constructor(ApplicationHelper) {
    'ngInject';
    this.ApplicationHelper = ApplicationHelper;
  }

  switchApplication(applicationName) {
    return {
      type: actions.SWITCH_APPLICATION,
      payload: { applicationName },
    };
  }
}
