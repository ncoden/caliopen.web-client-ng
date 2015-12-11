import {createSelector} from 'reselect';

const contactSelector = createSelector(
  state => state.contactReducer,
  payload => {
    return { contacts: payload.contacts };
  });

class ContactsController {
  /*@ngInject*/
  constructor($scope, $ngRedux, ContactsActions) {
    $scope.$on('$destroy', $ngRedux.connect(contactSelector)(this));
    $ngRedux.dispatch(ContactsActions.fetchContacts());
  }
}

export function ContactsDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ContactsController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
    <div class="container-fluid">
      <div class="co-contact-list">
        <div ng-repeat="contact in ctrl.contacts" class="row co-contact-list__item">
          <div class="col-xs-4 col-sm-1">
            <widget-contact-avatar-letter contact="contact"></widget-contact-avatar-letter>
          </div>
          <div class="col-xs-8 col-sm-11">
            <h3 class="co-contact-list__card-title" ng-click="ctrl.show(contact)">
              {{contact.title}}
            </h3>
          </div>
          <div class="col-xs-12 col-sm-11 col-sm-offset-1">
            <ul class="co-contact-list__card-icons">
              <li ng-repeat="email in contact.emails"><i class="fa fa-envelope" /> {{email.address}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
  };
}

exports.ContactsController = ContactsController;
