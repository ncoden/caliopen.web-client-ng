import { createSelector } from 'reselect';

const contactSelector = createSelector(
  state => state.contactReducer,
  state => state.router.currentParams.contact_id,
  (contactReducer, contactId) => ({
    contact: (contactReducer.contactsById[contactId] || {}),
    isFetching: contactReducer.isFetching,
  })
);

const routerSelector = createSelector(
  state => state.router.currentParams.contact_id,
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

class ContactCardController {
  constructor($scope, $ngRedux, ContactsActions) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.ContactsActions = ContactsActions;
  }

  $onInit() {
    this.contactCardSummaryProps = {
      avatar: {
        size: 'xlarge',
      },
      container: {
        stylesheets: {
          block: 's-contact__contact-summary',
          editButton: 's-contact__contact-summary-edit-button',
          avatar: 's-contact__avatar',
          title: 's-contact__title',
        },
      },
      stylesheets: {
        summaryForm: 's-contact__summary-form',
        firstnameField: 's-contact__field-group--medium',
        lastnameField: 's-contact__field-group--medium',
        birthdayField: 's-contact__field-group--shrink',
        saveBtn: 's-contact__save-button',
        saveBtnContainer: 's-contact__save-button-container',
      },
    };

    this.$scope.$on('$destroy', this.$ngRedux.connect(contactSelector)(this));
    this.$scope.$on('$destroy', this.$ngRedux.connect(routerSelector)((payload) => {
      if (!!payload.contactId) {
        this.$ngRedux.dispatch(this.ContactsActions.fetchContact(payload.contactId));
      }
    }));
    this.editMode = false;
  }

  updateMainInfo({ contact }) {
    this.$ngRedux.dispatch(this.ContactsActions.updateContact(contact));
  }

  addContactDetail() {
    // TODO: manage redux dispatch here
  }

  deleteContactDetail({ type, entity }) {
    const contactId = this.contact.contact_id;
    this.$ngRedux.dispatch(this.ContactsActions.deleteContactDetail(type, contactId, entity));
  }
}

const ContactCardComponent = {
  controller: ContactCardController,
  /* eslint-disable max-len */
  template: `
    <spinner loading="$ctrl.isFetching"></spinner>
    <div ng-if="!$ctrl.isFetching" class="s-contact">
      <div class="s-contact__col-datas-irl">

        <contact-card-summary
          contact="$ctrl.contact"
          props="$ctrl.contactCardSummaryProps"
          on-change="$ctrl.updateMainInfo($event)"
        ></contact-card-summary>

        <div class="m-subtitle">
          <h3 class="m-subtitle__text">
            {{ 'contact.groups'|translate }}
          </h3>
        </div>
        <p>
          <div ng-repeat="tag in $ctrl.contact.tags" class="m-tag">
            {{ tag }}
          </div>
        </p>

      </div>
      <div class="s-contact__col-datas-online">
        <contact-details
          contact="$ctrl.contact"
          props="$ctrl.contactDetailsProps"
          on-add-contact-detail="$ctrl.addContactDetail($event)"
          on-delete-contact-detail="$ctrl.deleteContactDetail($event)"
          allow-connect-remote-entity="false"
        ></contact-details>

        <div class="s-contact__m-subtitle m-subtitle m-subtitle--hr">
          <h3 class="m-subtitle__text">
            {{ 'contact.accounts'|translate }}
          </h3>
        </div>
        <ul class="m-text-list">
          <li ng-repeat="identity in $ctrl.contact.identities"
            class="m-text-list__item m-text-list__item--large"
          >
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

export default ContactCardComponent;
