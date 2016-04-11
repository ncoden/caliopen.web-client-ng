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

//---------
// Backend constants. cf. backend component base.user.parameters.contact
// FIXME: add [Organization | Phone | Social]
// const ORG_TYPES = ['work', 'home'];
//
// const PHONE_TYPES = ['assistant', 'callback', 'car', 'company_main',
//                'fax', 'home', 'home_fax', 'isdn', 'main', 'mobile',
//                'other', 'other_fax', 'pager', 'radio', 'telex',
//                'tty_tdd', 'work', 'work_fax', 'work_mobile', 'work_pager'];
// const SOCIAL_TYPES = ['facebook', 'twitter', 'google', 'github', 'bitbucket',
//                 'linkedin', 'ello', 'instagram', 'tumblr', 'skype'];
//----------

class ContactController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.ContactsActions = ContactsActions;
    $scope.$on('$destroy', $ngRedux.connect(contactSelector)(this));
    $scope.$on('$destroy', $ngRedux.connect(routerSelector)((payload) => {
      if (!!payload.contactId) {
        $ngRedux.dispatch(ContactsActions.fetchContact(payload.contactId));
      }
    }));
    this.editMode = false;
  }

  deleteContactDetail(type, entity) {
    const contactId = this.contact.contact_id;
    this.$ngRedux.dispatch(this.ContactsActions.deleteContactDetail(type, contactId, entity));
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
      <div ng-if="ctrl.isFetching" class="m-loading">
        <span class="m-loading__icon">
      </div>
      <div ng-if="!ctrl.isFetching" class="s-contact">
        <div class="s-contact__col-datas-irl">

          <div class="s-contact__m-contact-card m-contact-card">
            <div class="s-contact__m-contact-card__m-avatar_ m-contact-card__m-avatar_">
              <widget-contact-avatar-letter contact="ctrl.contact"></widget-contact-avatar-letter>
            </div>
            <h3 class="m-contact-card__title">
              {{ ctrl.contact.title }}
              <span class="m-badge">
                <span class="fa fa-lock"></span>
                <!-- Privacy Index -->
              </span>
            </h3>

            <button class="s-contact__message-button button small">
              {{ 'contact.message'|translate }}
            </button>
          </div>

          <div class="m-subtitle">
            <h3 class="m-subtitle__text">
              {{ 'contact.groups'|translate }}
            </h3>
          </div>
          <p>
            <div ng-repeat="tag in ctrl.contact.tags" class="m-tag">
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

          <div class="s-contact__m-subtitle m-subtitle m-subtitle--hr">
            <h3 class="m-subtitle__text">
              {{ 'contact.contact_details'|translate }}
            </h3>

            <button class="m-subtitle__m-inline-button m-inline-button pull-right"
              ng-class="{ 'active': !!ctrl.editMode }"
              ng-click="ctrl.editMode = !ctrl.editMode">
              <i class="fa fa-edit"></i>
              <span class="show-for-sr">{{ 'contact.action.edit_contact_details'|translate }}</span>
            </button>
          </div>

          <ul class="m-text-list s-contact__m-contact-detail-list">
            <li ng-repeat="email in ctrl.contact.emails|orderBy:'address'"
                class="m-text-list__item">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-envelope"></span>
                <span ng-switch="!!email.is_primary">
                  <span ng-switch-when="true" ng-title="'contact.primary'|translate"><strong>{{ email.address }}</strong></span>
                  <span ng-switch-default>{{ email.address }}</span>
                </span>
                <small><em>{{ ('contact.email_type.' + email.type)|translate}}</em></small>
                <button ng-if="ctrl.editMode" ng-click="ctrl.deleteContactDetail('email', email)"
                        class="m-inline-button m-inline-button--alert"><i class="fa fa-remove"></i>
                  <span class="show-for-sr">{{ 'contact.action.delete_contact_detail'|translate }}</span>
                </button>
              </span>
            </li>

            <li ng-if="!!ctrl.editMode" class="m-text-list__item">
              <add-email-form contact="ctrl.contact"></add-email-form>
            </li>

            <li ng-repeat="phone in ctrl.contact.phones"
              class="m-text-list__item">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-phone"></span>
                {{ phone.number }}
                <button ng-if="ctrl.editMode" ng-click="ctrl.deleteContactDetail('phone', phone)"
                        class="m-inline-button m-inline-button--alert"><i class="fa fa-remove"></i>
                  <span class="show-for-sr">{{ 'contact.action.delete_contact_detail'|translate }}</span>
                </button>
              </span>
            </li>

            <li ng-repeat="im in ctrl.contact.ims"
              class="m-text-list__item">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-comment"></span>
                {{ im.address }}
                <small><em>{{ ('contact.im_type.' + im.type)|translate }}</em></small>
                <button ng-if="ctrl.editMode" ng-click="ctrl.deleteContactDetail('im', im)"
                        class="m-inline-button m-inline-button--alert"><i class="fa fa-remove"></i>
                  <span class="show-for-sr">{{ 'contact.action.delete_contact_detail'|translate }}</span>
                </button>
              </span>
            </li>
            <li ng-if="!!ctrl.editMode" class="m-text-list__item">
              <add-im-form contact="ctrl.contact"></add-im-form>
            </li>

            <li ng-repeat="address in ctrl.contact.addresses"
              class="m-text-list__item m-text-line">
              <span class="m-text-list__icon fa fa-map-marker"></span>
              <address>
                {{ address.street }}, {{ address.postal_code }} {{ address.city }}
                {{ address.country }} {{ address.region }}
              </adddress>
              <small><em>({{ address.label }} {{ ('contact.address_type.' + address.type)|translate}})</em></small>
              <button ng-if="ctrl.editMode" ng-click="ctrl.deleteContactDetail('address', address)"
                      class="m-inline-button m-inline-button--alert"><i class="fa fa-remove"></i>
                <span class="show-for-sr">{{ 'contact.action.delete_contact_detail'|translate }}</span>
              </button>
            </li>
            <li ng-if="!!ctrl.editMode" class="m-text-list__item">
              <add-address-form contact="ctrl.contact"></add-address-form>
            </li>
          </ul>

          <div class="s-contact__m-subtitle m-subtitle m-subtitle--hr">
            <h3 class="m-subtitle__text">
              {{ 'contact.accounts'|translate }}
            </h3>
          </div>
          <ul class="m-text-list">
            <li ng-repeat="identity in ctrl.contact.identities"
              class="m-text-list__item">
              <span class="m-text-line">
                <span class="m-text-list__icon fa fa-at"></span>
                {{ identity }}
              </span>
            </li>
          </ul>

        </div>
      </div>`,
    /* eslint-enable max-len */
  };
}
