import {v1 as uuidV1} from 'uuid';

export class ContactsContactController {
  constructor($ngRedux, TabsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.TabsActions = TabsActions;
  }

  showContact() {
    this.$ngRedux.dispatch(dispatch => {
      dispatch(this.TabsActions.addTab({
        id: uuidV1(),
        route: 'front.contacts.contact',
        routeOpts: { contactId: this.contact.contact_id },
        label: this.contact.title
      }));
    });
  }
}

export function ContactsContactDirective() {
  return {
    restrict: 'E',
    scope: {
      contact: '='
    },
    controller: ContactsContactController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div ng-click="ctrl.showContact()" class="row co-list__item co-list__item--link">
        <div class="row__vertical-align">
          <div class="col-xs-12 col-sm-5">
            <span class="co-contacts__contact-icon">
              <widget-contact-avatar-letter contact="ctrl.contact"></widget-contact-avatar-letter>
            </span>
            <span class="co-text--ellipsis">
              {{ ctrl.contact.title }}
            </span>
          </div>
          <div class="hidden-xs col-sm-7">
            <span class="co-text--ellipsis">
              {{ ctrl.contact.emails[0] }}
            </span>
            <span class="dropdown">
              <span class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
              </span>
              <ul class="dropdown-menu pull-right">
                <li ng-repeat="email in ctrl.contact.emails">
                  <i class="fa fa-envelope"></i>
                  {{email.address}}
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>`
  };
}
