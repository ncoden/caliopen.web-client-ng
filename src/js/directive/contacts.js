import {createSelector} from 'reselect';
import {v1 as uuidV1} from 'uuid';

const contactSelector = createSelector(
  state => state.contactReducer,
  payload => {
    return { contacts: payload.contacts };
  });

export class ContactsController {
  constructor($scope, $ngRedux, ContactsActions, TabsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
    $scope.$on('$destroy', $ngRedux.connect(contactSelector)(this));
    $ngRedux.dispatch(ContactsActions.fetchContacts());
  }

  showContact(contact) {
    this.$ngRedux.dispatch(dispatch => {
      dispatch(this.TabsActions.addTab({
        id: uuidV1(),
        route: 'front.contacts.contact',
        routeOpts: { contactId: contact.contact_id },
        label: contact.title
      }));
    });
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
    <div class="container-fluid co-list">
      <div ng-repeat="contact in ctrl.contacts" ng-click="ctrl.showContact(contact)" class="row co-list__item co-list__item--link">
        <div class="row__vertical-align">
          <div class="col-xs-12 col-sm-5">
            <span class="co-contacts__contact-icon">
              <widget-contact-avatar-letter contact="contact"></widget-contact-avatar-letter>
            </span>
            <span class="co-text--ellipsis">
              {{contact.title}}
            </span>
          </div>
          <div class="hidden-xs col-sm-7">
            <span class="co-text--ellipsis">
              {{contact.emails[0]}}
            </span>
            <span class="dropdown">
              <span class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
              </span>
              <ul class="dropdown-menu pull-right">
                <li ng-repeat="email in contact.emails">
                  <i class="fa fa-envelope"></i>
                  {{email.address}}
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>`
  };
}
