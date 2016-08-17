import { combineReducers } from 'redux';
import * as actions from '../action/action-types.js';

function tabsReducer(state = [], action = {}) {
  switch (action.type) {
    case actions.ADD_TAB:
      return [...state, action.payload.tab];
    case actions.REMOVE_TAB:
      return state.filter(currentTab => currentTab !== action.payload.tab);
    default:
      return state;
  }
}

const tabReducer = combineReducers({
  tabs: tabsReducer,
});

export default tabReducer;
