import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import avatarLetter from '../../common/avatar-letter';
import ContactListComponent from './contact-list.component.js';
import ContactItemComponent from './contact-item/contact-item.component.js';

const contactList = angular.module('contactList', [
  ngRedux,
  uiRouter,
  avatarLetter,
])
  .component('contactList', ContactListComponent)
  .component('contactItem', ContactItemComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('contact-list', {
        url: '/contacts',
        views: {
          '@': {
            template: '<contact-list></contact-list>',
          },
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default contactList;
