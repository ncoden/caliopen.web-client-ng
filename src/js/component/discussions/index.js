import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import infiniteScroll from '../../common/infinite-scroll';
import spinner from '../../common/spinner';
import stylesheetHelper from '../../common/stylesheet-helper';
import DiscussionsComponent from './discussions.component.js';
import ContactsIconComponent from './contacts-icon/contacts-icon.component.js';
import ThreadItemComponent from './thread-item/thread-item.component.js';

const discussions = angular.module('discussions', [
  ngRedux,
  uiRouter,
  infiniteScroll,
  spinner,
  stylesheetHelper,
])
  .component('discussions', DiscussionsComponent)
  .component('contactsIcon', ContactsIconComponent)
  .component('threadItem', ThreadItemComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('discussions', {
        url: '/',
        views: {
          '@': {
            template: '<discussions></discussions>',
          },
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default discussions;
