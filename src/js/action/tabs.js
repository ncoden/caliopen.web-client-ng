import * as action from './action-types.js';

export class TabsActions {
  requestTabs() {
    return {
      type: action.REQUEST_TABS
    };
  }

  createTab(tab) {
    return {
      type: action.CREATE_TAB,
      tab
    };
  }

  removeTab(tab) {
    return {
      type: action.REMOVE_TAB,
      tab
    };
  }
}
