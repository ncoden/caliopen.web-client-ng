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
      tab,
    };
  }

  selectOrAdd(tab) {
    return {
      type: action.SELECT_OR_ADD_TAB,
      tab,
    };
  }

  resetSelectedTab() {
    return {
      type: action.SELECT_TAB,
      tab: null,
    };
  }

  removeTab(tab) {
    return {
      type: action.REMOVE_TAB,
      tab,
    };
  }
}
