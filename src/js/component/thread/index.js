import angular from 'angular';
import uiRouter from 'angular-ui-router';
import avatarLetter from '../../common/avatar-letter';
import spinner from '../../common/spinner';
import notFound from '../../common/not-found';
import ThreadComponent from './thread.component.js';
import MessageComponent from './message/message.component.js';

const thread = angular.module('thread', [
  uiRouter,
  avatarLetter,
  spinner,
  notFound,
])
  .component('thread', ThreadComponent)
  .component('threadMessage', MessageComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('thread', {
        url: '/threads/{thread_id}',
        views: {
          '@': {
            template: '<thread></thread>',
          },
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default thread;
