import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import recipientList from '../../common/recipient-list/';
import DiscussionDraftComponent from './discussion-draft.component.js';
import DiscussionDraftService from './discussion-draft.service.js';

const discussionDraft = angular.module('discussionDraft', [
  ngRedux,
  uiRouter,
  recipientList,
])
  .component('discussionDraft', DiscussionDraftComponent)
  .service('DiscussionDraft', DiscussionDraftService)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('discussion-draft', {
        url: '/discussion-draft/{message_id}',
        views: {
          '@': {
            template: '<discussion-draft></discussion-draft>',
          },
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default discussionDraft;
