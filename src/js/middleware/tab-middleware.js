import * as actions from '../action/action-types.js';
import { stateGo } from 'redux-ui-router';

export function tabMiddleware(TabsActions, ApplicationHelper, $state, TabHelper) {
  'ngInject';

  return store => next => action => {
    if (action.type === actions.SELECT_OR_ADD_TAB) {
      const foundTab = store.getState().tabReducer.tabs
        .find((tab) => angular.toJson(action.payload.tab) === angular.toJson(tab));

      if (!foundTab) {
        store.dispatch(TabsActions.addTab(action.payload.tab));
      }
    }

    if (action.type === actions.REMOVE_TAB) {
      const { route, params } = TabHelper.getRouteAndParamsForTab(action.payload.tab);
      if ($state.is(route, params)) {
        const applicationName = store.getState().applicationReducer.applicationName;
        store.dispatch(stateGo(ApplicationHelper.getInfos(applicationName).route));
      }
    }

    const result = next(action);

    const nextState = store.getState();
    const actionsRequiresTabOnReloading = [
      actions.RECEIVE_CONTACT,
      actions.RECEIVE_THREAD,
      actions.CREATE_DRAFT_MESSAGE,
    ];
    if (actionsRequiresTabOnReloading.indexOf(action.type) !== -1
      && nextState.tabReducer.tabs.length === 0) {
      switch (action.type) {
        case actions.RECEIVE_CONTACT:
          store.dispatch(TabsActions.addTab({
            type: 'contact',
            item: {
              contact_id: action.payload.contact.contact_id,
            },
          }));
          break;
        case actions.RECEIVE_THREAD:
          store.dispatch(TabsActions.addTab({
            type: 'thread',
            item: {
              thread_id: action.payload.thread.thread_id,
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
