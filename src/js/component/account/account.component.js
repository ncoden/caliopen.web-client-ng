import { createSelector } from 'reselect';

const userSelector = createSelector(
  state => state.userReducer,
  userReducer => ({ ...userReducer })
);

const remoteIdentitiesSelector = createSelector(
  state => state.remoteIdentityReducer,
  remoteIdentityReducer => ({
    remoteIdentities: remoteIdentityReducer
      .remoteIdentities.map((id) => remoteIdentityReducer.remoteIdentitiesById[id]),
  })
);

class AccountController {

  constructor($scope, $ngRedux, UserActions, ContactsActions, RemoteIdentityActions, FlashMessage) {
    'ngInject';
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.UserActions = UserActions;
    this.RemoteIdentityActions = RemoteIdentityActions;
    this.ContactsActions = ContactsActions;
    this.FlashMessage = FlashMessage;
  }

  $onInit() {
    this.editMode = false;
    this.contactCardSummaryProps = {
      avatar: {
        size: 'xlarge',
      },
      container: {
        stylesheets: {
          block: 's-account__contact-summary',
          editButton: 's-account__contact-summary-edit-button',
          avatar: 's-account__avatar',
          title: 's-account__title',
        },
      },
      stylesheets: {
        summaryForm: 's-account__summary-form',
        firstnameField: 's-account__field-group--medium',
        lastnameField: 's-account__field-group--medium',
        birthdayField: 's-account__field-group--shrink',
        saveBtn: 's-account__save-button',
        saveBtnContainer: 's-account__save-button-container',
      },
    };

    this.contactDetailsProps = {
      remoteIdentity: {
        stylesheets: {
          formRow: 's-account__remote-identity-form-row',
          fieldGroup: 's-account__field-group--medium',
          buttons: 's-account__remote-identity-buttons',
          fetchingPanel: 's-account__remote-identity-fetching-panel',
          fetchingPanelContent: 's-account__remote-identity-fetching-panel-content',
        },
      },
    };

    this.$scope.$on('$destroy', this.$ngRedux.connect(userSelector)(this));
    this.$scope.$on('$destroy', this.$ngRedux.connect(remoteIdentitiesSelector)(this));
  }

  updateMainInfo($event) {
    const { contact } = $event;

    this.$ngRedux.dispatch(this.UserActions.updateUserContact(contact));
  }

  addContactDetail() {
    // TODO: manage redux dispatch here
    this.$ngRedux.dispatch(this.UserActions.invalidate());
  }

  deleteContactDetail({ type, entity }) {
    const contactId = this.user.contact.contact_id;
    this.$ngRedux.dispatch(dispatch => {
      dispatch(this.ContactsActions.deleteContactDetail(type, contactId, entity));
      dispatch(this.UserActions.invalidate());
    });
  }

  connectRemoteIdentity({ remoteIdentity }) {
    this.$ngRedux.dispatch((dispatch) => {
      if (!remoteIdentity.remote_identity_id) {
        dispatch(this.RemoteIdentityActions.addRemoteIdentity(remoteIdentity));
      } else {
        dispatch(this.RemoteIdentityActions.updateRemoteIdentityParams(remoteIdentity));
        dispatch(this.RemoteIdentityActions.connect(remoteIdentity));
      }
    });
  }

  disconnectRemoteIdentity({ remoteIdentity }) {
    this.$ngRedux.dispatch(this.RemoteIdentityActions.disconnect(remoteIdentity));
  }

  setMainAddress() {
    // TODO: API for main address
    // does caliopen instance address is in contact details (I suppose)
    // is primary available for all digital contact details and can be used as real primary ?
    this.FlashMessage.info(
      'Primary contact protocol/address definition is not yet implemented.',
      { timeout: 10000 }
    );
  }
}

const AccountComponent = {
  controller: AccountController,
  template: `
    <spinner loading="$ctrl.isFetching"></spinner>
    <div class="s-account" ng-if="!!$ctrl.user">
      <div class="s-account__col-datas-irl">
        <contact-card-summary
          contact="$ctrl.user.contact"
          props="$ctrl.contactCardSummaryProps"
          on-change="$ctrl.updateMainInfo($event)"
        ></contact-card-summary>

        <div class="m-text-line">
          <span class="fa fa-envelope"></span>
          {{ $ctrl.user.name }}

          <span class="pull-right">
            {{ 'account.primary_email_label'|translate }}
            <switch
              label="'account.action.is_primary'|translate"
              model="$ctrl.mainAddress"
              value="$ctrl.user.name"
              on-change="$ctrl.setMainAddress()"
            ></switch>
          </span>
        </div>

      </div>
      <div class="s-contact__col-datas-online">
        <contact-details
          contact="$ctrl.user.contact"
          props="$ctrl.contactDetailsProps"
          on-add-contact-detail="$ctrl.addContactDetail($event)"
          on-delete-contact-detail="$ctrl.deleteContactDetail($event)"
          allow-connect-remote-entity="true"
          on-connect-remote-identity="$ctrl.connectRemoteIdentity($event)"
          on-disconnect-remote-identity="$ctrl.disconnectRemoteIdentity($event)"
          remote-identities="$ctrl.remoteIdentities"
        ></contact-details>
        <div class="s-contact__m-subtitle m-subtitle m-subtitle--hr">
          <h3 class="m-subtitle__text">
            {{ 'contact.accounts'|translate }}
          </h3>
        </div>
        <ul class="m-text-list">
          <li ng-repeat="identity in $ctrl.contact.identities"
            class="m-text-list__item m-text-list__item--large">
            <span class="m-text-line">
              <span class="m-text-list__icon fa fa-at"></span>
              {{ identity }}
            </span>
          </li>
        </ul>
    </div>
  `,
};

export default AccountComponent;
