import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import contact from '../../common/contact';
import spinner from '../../common/spinner';
import AccountComponent from './account.component.js';

const account = angular.module('account', [
  ngRedux,
  uiRouter,
  contact,
  spinner,
])
  .component('account', AccountComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('account', {
        url: '/account',
        views: {
          '@': {
            template: '<account></account>',
          },
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default account;
