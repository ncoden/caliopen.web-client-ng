import angular from 'angular';
import ngRedux from 'ng-redux';
import angularHammer from 'angular-hammer';
import flashMessage from '../flash-message';
import discussionDraft from '../../component/discussion-draft';
import CallToActionComponent from './call-to-action.component.js';

const callToAction = angular.module('callToAction', [
  angularHammer,
  ngRedux,
  flashMessage,
  discussionDraft,
])
  .component('callToAction', CallToActionComponent)
  .name;

export default callToAction;
