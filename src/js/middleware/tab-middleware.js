import * as actions from '../action/action-types.js';
import { stateGo } from 'redux-ui-router';

export function tabMiddleware(TabsActions, ApplicationHelper, $state, TabHelper) {
  'ngInject';

  return store => next => action => {
    if (action.type === actions.SELECT_OR_ADD_TAB) {
      const foundTab = store.getState().tabReducer.tabs
        .find((tab) => angular.toJson(action.tab) === angular.toJson(tab));

      if (!foundTab) {
        store.dispatch(TabsActions.addTab(action.tab));
      }
    }

    if (action.type === actions.REMOVE_TAB) {
      const { route, params } = TabHelper.getRouteAndParamsForTab(action.tab);
      if ($state.is(route, params)) {
        store.dispatch(stateGo(ApplicationHelper.getCurrentInfos().route));
      }
    }

    const result = next(action);

    const nextState = store.getState();
    const actionsRequiresTabOnReloading = [
      actions.RECEIVER_CONTACT,
      actions.RECEIVER_THREAD,
      actions.CREATE_DRAFT_MESSAGE,
    ];
    if (actionsRequiresTabOnReloading.indexOf(action.type) !== -1
      && nextState.tabReducer.tabs.length === 0) {
      switch (action.type) {
        case actions.RECEIVER_CONTACT:
          store.dispatch(TabsActions.addTab({
            type: 'contact',
            item: {
              contact_id: action.contact.contact_id,
            },
          }));
          break;
        case actions.RECEIVER_THREAD:
          store.dispatch(TabsActions.addTab({
            type: 'thread',
            item: {
              thread_id: action.thread.thread_id,
            },
          }));
          break;
        default:
          break;
      }
    }

    return result;
  };
}
