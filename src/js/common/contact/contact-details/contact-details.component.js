class ContactDetailsController {
}

const ContactDetailsComponent = {
  controller: ContactDetailsController,
  bindings: {
    contact: '<',
    props: '<',
    onAddContactDetail: '&',
    onDeleteContactDetail: '&',
    allowConnectRemoteEntity: '<?',
    onConnectRemoteIdentity: '&?',
    onDisconnectRemoteIdentity: '&?',
    remoteIdentities: '<?',
  },
  template: `
    <contact-details-container
      contact="$ctrl.contact"
      on-delete-contact-detail="$ctrl.onDeleteContactDetail({ $event: $event })"
      allow-connect-remote-entity="$ctrl.allowConnectRemoteEntity"
      on-connect-remote-identity="$ctrl.onConnectRemoteIdentity({ $event: $event })"
      on-disconnect-remote-identity="$ctrl.onDisconnectRemoteIdentity({ $event: $event })"
      remote-identities="$ctrl.remoteIdentities"
      edit-mode="$ctrl.editMode"
      props="$ctrl.props"
    >
      <edit-button>
        <button class="m-link m-link--button pull-right"
          ng-class="{ 'active': !!$ctrl.editMode }"
          ng-click="$ctrl.editMode = !$ctrl.editMode"
        >
          <i class="fa fa-edit"></i>
          <span class="show-for-sr">{{ 'contact.action.edit_contact_details'|translate }}</span>
        </button>
      </edit-button>
      <email-form>
        <add-contact-email-form
          contact="$ctrl.contact"
          on-add="$ctrl.onAddContactDetail($event)"
        ></add-contact-email-form>
      </email-form>
      <im-form>
        <add-contact-im-form
          contact="$ctrl.contact"
          on-add="$ctrl.onAddContactDetail($event)"
        ></add-contact-im-form>
      </im-form>
      <address-form>
        <add-contact-address-form
          contact="$ctrl.contact"
          on-add="$ctrl.onAddContactDetail($event)"
        ></add-contact-address-form>
      </address-form>
    </contact-details-container>
  `,
};

export default ContactDetailsComponent;
