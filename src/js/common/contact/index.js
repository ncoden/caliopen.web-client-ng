import angular from 'angular';
import avatarLetter from '../avatar-letter';
import flashMessage from '../flash-message';
import form from '../form';
import RemoteIdentityEmailComponent
  from './contact-details/remote-identity-email/remote-identity-email.component.js';
import ContactCardSummaryComponent from './contact-card-summary/contact-card-summary.component.js';
import ContactCardSummaryContainerComponent
  from './contact-card-summary/contact-card-summary-container.component.js';
import ContactDetailsComponent from './contact-details/contact-details.component.js';
import ContactDetailsContainerComponent
  from './contact-details/contact-details-container.component.js';
import AddContactAddressFormComponent
  from './contact-details/form/add-contact-address-form.component.js';
import AddContactEmailFormComponent
  from './contact-details/form/add-contact-email-form.component.js';
import AddContactImFormComponent
  from './contact-details/form/add-contact-im-form.component.js';

const contact = angular.module('contact-common', [
  avatarLetter,
  flashMessage,
  form,
])
  .component('remoteIdentityEmail', RemoteIdentityEmailComponent)
  .component('contactCardSummary', ContactCardSummaryComponent)
  .component('contactCardSummaryContainer', ContactCardSummaryContainerComponent)
  .component('contactDetails', ContactDetailsComponent)
  .component('contactDetailsContainer', ContactDetailsContainerComponent)
  .component('addContactAddressForm', AddContactAddressFormComponent)
  .component('addContactEmailForm', AddContactEmailFormComponent)
  .component('addContactImForm', AddContactImFormComponent)
  .name;

export default contact;
