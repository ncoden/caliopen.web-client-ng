import * as actions from '../action/action-types.js';
import { stateGo } from 'redux-ui-router';

export function tabMiddleware(TabsActions, ApplicationManager, $state) {
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
      const { routeName, routeParams } = action.payload.tab;
      if ($state.is(routeName, routeParams)) {
        const applicationName = store.getState().applicationReducer.applicationName;
        store.dispatch(stateGo(ApplicationManager.getInfos(applicationName).route));
      }
    }

    const result = next(action);
    const nextState = store.getState();

    const addOrSelectTab = ({ routeName, routeParams }) => {
      store.dispatch(TabsActions.selectOrAdd({ routeName, routeParams }));
    };

    const registeredRoutesName = [
      'thread',
      'contact',
      'discussion-draft',
      'account',
    ];

    const tabRouteHandler = (currentAction, reduxState) => {
      const routeName = reduxState.router.currentState.name;
      if (
        currentAction.type === '@@reduxUiRouter/$stateChangeSuccess'
        && registeredRoutesName.indexOf(routeName) !== -1
      ) {
        addOrSelectTab({
          routeName,
          routeParams: reduxState.router.currentParams,
        });
      }
    };

    tabRouteHandler(action, nextState);

    return result;
  };
}
