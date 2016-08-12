import angular from 'angular';
import protocolIcon from '../protocol-icon';
import RecipientListComponent from './recipient-list.component.js';
import RecipientComponent from './recipient/recipient.component.js';
import GetFocusDirective from './get-focus.directive.js';

const recipientList = angular.module('recipientList', [protocolIcon])
  .component('recipientList', RecipientListComponent)
  .component('recipient', RecipientComponent)
  .directive('getFocus', GetFocusDirective)
  .name;

export default recipientList;
