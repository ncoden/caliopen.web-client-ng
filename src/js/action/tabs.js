import * as action from './action-types.js';

export class TabsActions {
  requestTabs() {
    return {
      type: action.REQUEST_TABS,
    };
  }

  addTab(tab) {
    return (dispatch) => {
      dispatch({
        type: action.ADD_TAB,
        tab,
      });
      dispatch(this.selectTab(tab));
    };
  }

  selectTab(tab) {
    return {
      type: action.SELECT_TAB,
      tabId: tab.id,
    };
  }

  resetSelectedTab() {
    return {
      type: action.SELECT_TAB,
      tabId: null,
    };
  }

  removeTab(tab) {
    return {
      type: action.REMOVE_TAB,
      tab,
    };
  }
}
