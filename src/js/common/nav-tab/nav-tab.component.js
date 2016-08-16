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
    <span ng-switch="$ctrl.tab.type">
      <a ng-switch-when="thread"
        ui-sref="thread({ threadId: $ctrl.tab.item.thread_id })"
        title="{{$ctrl.getThread($ctrl.tab.item.thread_id)|threadContacts:$ctrl.user}}"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-comments-o"></i>
        {{$ctrl.getThread($ctrl.tab.item.thread_id)|threadContacts:$ctrl.user|limitTo:200}}
      </a>

      <a ng-switch-when="contact"
        ui-sref="contact({ contactId: $ctrl.tab.item.contact_id })"
        title="{{$ctrl.getContact($ctrl.tab.item.contact_id).title}}"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-user"></i>
        {{$ctrl.getContact($ctrl.tab.item.contact_id).title|limitTo:200}}
      </a>

      <a ng-switch-when="draft-message"
        ui-sref="discussion-draft({ messageId: $ctrl.tab.item.message_id })"
        class="m-tab__link" ng-class="$ctrl.linkStylesheet"
      >
        <i class="fa fa-envelope-o"></i>
        {{'messages.compose.title'|translate}}
      </a>
    </span>
  `,
};

export default NavTabComponent;
