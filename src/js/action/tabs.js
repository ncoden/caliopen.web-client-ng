import * as action from './action-types.js';

export class TabsActions {
  requestTabs() {
    return {
      type: action.REQUEST_TABS,
    };
  }

  addTab(tab) {
    return {
      type: action.ADD_TAB,
      tab,
    };
  }

  selectOrAdd(tab) {
    return {
      type: action.SELECT_OR_ADD_TAB,
      tab,
    };
  }

  removeTab(tab) {
    return {
      type: action.REMOVE_TAB,
      tab,
    };
  }
}
