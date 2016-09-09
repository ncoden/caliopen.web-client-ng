import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import avatarLetter from '../../common/avatar-letter';
import contactCommon from '../../common/contact';
import spinner from '../../common/spinner';
import notFound from '../../common/not-found';
import ContactCardComponent from './contact-card.component.js';

const contact = angular.module('contact', [
  ngRedux,
  uiRouter,
  avatarLetter,
  contactCommon,
  spinner,
  notFound,
])
  .component('contactCard', ContactCardComponent)
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
