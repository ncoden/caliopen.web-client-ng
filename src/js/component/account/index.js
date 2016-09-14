import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import contact from '../../common/contact';
import form from '../../common/form';
import spinner from '../../common/spinner';
import openPGPManager from '../../common/openpgp-manager';
import AccountComponent from './account.component.js';
import AccountOpenPGPKeysComponent from './account-openpgp-keys/account-openpgp-keys.component.js';
import AccountOpenPGPKeyFormComponent from
  './account-openpgp-keys/account-openpgp-key-form/account-openpgp-key-form.component.js';

const account = angular.module('account', [
  ngRedux,
  uiRouter,
  contact,
  form,
  spinner,
  openPGPManager,
])
  .component('account', AccountComponent)
  .component('accountOpenpgpKeys', AccountOpenPGPKeysComponent)
  .component('accountOpenpgpKeyForm', AccountOpenPGPKeyFormComponent)
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
