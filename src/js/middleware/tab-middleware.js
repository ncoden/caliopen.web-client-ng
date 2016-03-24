import * as actions from '../action/action-types.js';

export function tabMiddleware(TabsActions) {
  'ngInject';

  return store => next => action => {
    const actionsRequiresResetTab = [
      actions.REQUEST_THREADS,
      actions.REQUEST_CONTACTS,
    ];
    if (actionsRequiresResetTab.indexOf(action.type) !== -1) {
      store.dispatch(TabsActions.resetSelectedTab());
    }

    if (action.type === actions.SELECT_OR_ADD_TAB) {
      const foundTab = store.getState().tabReducer.tabs
        .find((tab) => angular.toJson(action.tab) === angular.toJson(tab));

      if (!foundTab) {
        store.dispatch(TabsActions.addTab(action.tab));
      } else {
        store.dispatch(TabsActions.selectTab(foundTab));
      }
    }

    const result = next(action);

    const nextState = store.getState();
    const actionsRequiresTabOnReloading = [
      actions.RECEIVER_CONTACT,
      actions.RECEIVER_THREAD,
    ];
    if (actionsRequiresTabOnReloading.indexOf(action.type) !== -1
      && nextState.tabReducer.tabs.length === 0) {
      let tabLabel = undefined;
      switch (action.type) {
        case actions.RECEIVER_CONTACT:
          tabLabel = action.contact.title;
          break;
        default:
        case actions.RECEIVER_THREAD:
          tabLabel = action.thread.text;
          break;
      }
      store.dispatch(TabsActions.addTab({
        route: nextState.router.currentState.name,
        routeOpts: nextState.router.currentParams,
        label: tabLabel,
      }));
    }

    return result;
  };
}
