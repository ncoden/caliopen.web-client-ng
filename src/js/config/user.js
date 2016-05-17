export function UserConfig($ngRedux, UserActions) {
  'ngInject';
  $ngRedux.dispatch(UserActions.fetchUser());
}
