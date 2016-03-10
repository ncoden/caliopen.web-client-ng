import * as action from './action-types.js';
import { stateGo } from 'redux-ui-router';

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
    return (dispatch) => {
      dispatch({
        type: action.SELECT_TAB,
        tabId: tab.id,
      });
      dispatch(stateGo(tab.route, tab.routeOpts));
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
