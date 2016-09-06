import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer.user,
  user => ({ user })
);

class NavTabController {
  constructor($scope, $ngRedux) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
  }

  $onInit() {
    this.$scope.$on('$destroy', this.$ngRedux.connect(userSelector)(this));
  }

  getThread(threadId) {
    return this.$ngRedux.getState().threadReducer.threadsById[threadId];
  }

  getContact(contactId) {
    return this.$ngRedux.getState().contactReducer.contactsById[contactId];
  }
}

const NavTabComponent = {
  bindings: {
    tab: '<',
    linkStylesheet: '@',
  },
  controller: NavTabController,
  template: `
    <span ng-switch="$ctrl.tab.routeName">
      <a ng-switch-when="thread"
        ui-sref="thread($ctrl.tab.routeParams)"
        title="{{$ctrl.getThread($ctrl.tab.routeParams.thread_id)|threadContacts:$ctrl.user}}"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-comments-o"></i>
        {{$ctrl.getThread($ctrl.tab.routeParams.thread_id)|threadContacts:$ctrl.user|limitTo:200}}
      </a>

      <a ng-switch-when="contact"
        ui-sref="contact($ctrl.tab.routeParams)"
        title="{{$ctrl.getContact($ctrl.tab.routeParams.contact_id).title}}"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-user"></i>
        {{$ctrl.getContact($ctrl.tab.routeParams.contact_id).title|limitTo:200}}
      </a>

      <a ng-switch-when="discussion-draft"
        ui-sref="discussion-draft($ctrl.tab.routeParams)"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-envelope-o"></i>
        {{'messages.compose.title'|translate}}
      </a>
      <a ng-switch-when="account"
        ui-sref="account"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-user"></i>
        {{'account.title'|translate}}
      </a>
    </span>
  `,
};

export default NavTabComponent;
