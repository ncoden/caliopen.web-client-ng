import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import avatarLetter from '../../common/avatar-letter';
import spinner from '../../common/spinner';
import ContactCardComponent from './contact-card.component.js';
import AddContactAddressFormComponent from './add-contact-address-form.component.js';
import AddContactEmailFormComponent from './add-contact-email-form.component.js';
import AddContactImFormComponent from './add-contact-im-form.component.js';

const contact = angular.module('contact', [
  ngRedux,
  uiRouter,
  avatarLetter,
  spinner,
])
  .component('contactCard', ContactCardComponent)
  .component('addContactAddressForm', AddContactAddressFormComponent)
  .component('addContactEmailForm', AddContactEmailFormComponent)
  .component('addContactImForm', AddContactImFormComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('contact', {
        url: '/contacts/{contact_id}',
        views: {
          '@': {
            template: '<contact-card></contact-card>',
          },
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default contact;
