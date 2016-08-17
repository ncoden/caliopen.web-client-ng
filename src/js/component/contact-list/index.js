import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import avatarLetter from '../../common/avatar-letter';
import infiniteScroll from '../../common/infinite-scroll';
import spinner from '../../common/spinner';
import ContactListComponent from './contact-list.component.js';
import ContactItemComponent from './contact-item/contact-item.component.js';

const contactList = angular.module('contactList', [
  ngRedux,
  uiRouter,
  avatarLetter,
  infiniteScroll,
  spinner,
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
