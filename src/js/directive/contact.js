import { createSelector } from 'reselect';

const contactSelector = createSelector(
  state => state.contactReducer,
  state => state.router.currentParams.contactId,
  (contactsState, contactId) => ({
    contact: (contactsState[contactId] || {}),
    isFetching: contactsState.isFetching,
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
      $ngRedux.dispatch(ContactsActions.fetchContact(payload.contactId));
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
      <div class="container-fluid">
        <div ng-if="ctrl.isFetching" class="co-loading">
          <span class="co-loading__icon">
        </div>
        <div ng-if="!ctrl.isFetching" class="row co-contact">
          <div class="col-xs-12 col-sm-5 col-md-4 co-contact__datas-irl">

            <div class="co-contact__datas-irl__header">
              <div class="co-contact__datas-irl__avatar">
                <widget-contact-avatar-letter
                  contact="ctrl.contact"
                ></widget-contact-avatar-letter>
              </div>

              <h2 class="co-contact__datas-irl__name">
                {{ ctrl.contact.title }}
                <span class="badge">
                  <span class="fa fa-lock"></span>
                  <!-- Privacy Index -->
                </span>
              </h2>

              <button class="btn btn-primary">
                {{ 'contact.message'|translate }}
              </button>
            </div>

            <p>
              <h3 class="co-contact__sub-title">
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
          <div class="col-xs-12 col-sm-7 col-md-8 co-contact__datas-online">

            <h3 class="co-contact__sub-title">
              {{ 'contact.coordinates'|translate }}
            </h3>
            <ul class="co-text-list">
              <li ng-repeat="email in ctrl.contact.emails"
                class="co-text-list__item co-text-list__item--link co-text--ellipsis">
                <span class="co-text-list__item__icon fa fa-envelope"></span>
                {{ email.address }}
              </li>

              <li ng-repeat="phone in ctrl.contact.phones"
                class="co-text-list__item co-text-list__item--link co-text--ellipsis">
                <span class="co-text-list__item__icon fa fa-phone"></span>
                {{ phone.number }}
              </li>

              <li ng-repeat="ims in ctrl.contact.ims"
                class="co-text-list__item co-text-list__item--link co-text--ellipsis">
                <span class="co-text-list__item__icon fa fa-comment"></span>
                {{ ims.address }}
              </li>
            </ul>

            <h3 class="co-contact__sub-title">
              {{ 'contact.accounts'|translate }}
            </h3>
            <p>
              <div class="row">
                <div ng-repeat="identity in ctrl.contact.identities"
                  class="col-sm-6 co-text--ellipsis">
                  <span class="fa fa-at"></span>
                  {{ identity }}
                </div>
              </div>
            </p>

          </div>
        </div>
      </div>`,
    /* eslint-enable max-len */
  };
}
