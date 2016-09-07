import angular from 'angular';
import protocolIcon from '../protocol-icon';
import dropdown from '../dropdown';
import RecipientListComponent from './recipient-list.component.js';
import RecipientComponent from './recipient/recipient.component.js';
import GetFocusDirective from './get-focus.directive.js';

const recipientList = angular.module('recipientList', [protocolIcon, dropdown])
  .component('recipientList', RecipientListComponent)
  .component('recipient', RecipientComponent)
  .directive('getFocus', GetFocusDirective)
  .name;

export default recipientList;
