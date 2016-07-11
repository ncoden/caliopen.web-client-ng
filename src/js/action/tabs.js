import * as actions from './action-types.js';

export default class TabsActions {
  requestTabs() {
    return {
      type: actions.REQUEST_TABS,
    };
  }

  addTab(tab) {
    return {
      type: actions.ADD_TAB,
      tab,
    };
  }

  selectOrAdd(tab) {
    return {
      type: actions.SELECT_OR_ADD_TAB,
      tab,
    };
  }

  removeTab(tab) {
    return {
      type: actions.REMOVE_TAB,
      tab,
    };
  }
}
