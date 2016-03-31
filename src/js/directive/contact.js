import { createSelector } from 'reselect';

const contactSelector = createSelector(
  state => state.contactReducer,
  state => state.router.currentParams.contactId,
  (contactReducer, contactId) => ({
    contact: (contactReducer.contactsById[contactId] || {}),
    isFetching: contactReducer.isFetching,
  })
);

const routerSelector = createSelector(
  state => state.router.currentParams.contactId,
  contactId => ({ contactId })
);

class ContactController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    $scope.$on('$destroy', $ngRedux.connect(contactSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)((payload) => {
      if (!!payload.contactId) {
        $ngRedux.dispatch(ContactsActions.fetchContact(payload.contactId));
      }
    }));
  }
}

export function ContactDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: ContactController,
    controllerAs: 'ctrl',
    bindToController: true,
    /* eslint-disable max-len */
    template: `
      <div ng-if="ctrl.isFetching" class="co-loading">
        <span class="co-loading__icon">
      </div>
      <div ng-if="!ctrl.isFetching" class="s-contact">
        <div class="s-contact__col-datas-irl">

          <div class="s-contact__m-contact-card m-contact-card">
            <div class="m-contact-card__m-avatar_">
              <widget-contact-avatar-letter contact="ctrl.contact"></widget-contact-avatar-letter>
            </div>
            <h3 class="m-contact-card__title">
              {{ ctrl.contact.title }}
              <span class="badge">
                <span class="fa fa-lock"></span>
                <!-- Privacy Index -->
              </span>
            </h3>

            <button class="s-contact__message-button button small">
              {{ 'contact.message'|translate }}
            </button>
          </div>

          <p>
            <h3 class="m-subtitle">
              {{ 'contact.groups'|translate }}
            </h3>
            <div ng-repeat="tag in ctrl.contact.tags" class="co-tag">
              {{ tag }}
            </div>
          </p>

          <p>
            <div ng-repeat="address in ctrl.contact.addresses">
              <span class="fa fa-home"></span>
              {{ address }}
            </div>
          </p>

        </div>
        <div class="s-contact__col-datas-online">

          <h3 class="m-subtitle">
            {{ 'contact.coordinates'|translate }}
          </h3>
          <ul class="m-text-list">
            <li ng-repeat="email in ctrl.contact.emails"
              class="m-text-list__item m-text-list__item--link">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-envelope"></span>
                {{ email.address }}
              </span>
            </li>

            <li ng-repeat="phone in ctrl.contact.phones"
              class="m-text-list__item m-text-list__item--link">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-phone"></span>
                {{ phone.number }}
              </span>
            </li>

            <li ng-repeat="ims in ctrl.contact.ims"
              class="m-text-list__item m-text-list__item--link">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-comment"></span>
                {{ ims.address }}
              </span>
            </li>
          </ul>

          <h3 class="m-subtitle">
            {{ 'contact.accounts'|translate }}
          </h3>
          <ul class="m-text-list">
            <li ng-repeat="identity in ctrl.contact.identities"
              class="m-text-list__item m-text-list__item--link">
              <span class="m-text-line">
                <span class="fa fa-at"></span>
                {{ identity }}
              </span>
            </li>
          </ul>

        </div>
      </div>`,
    /* eslint-enable max-len */
  };
}
