import angular from 'angular';
import angularFlashAlert from 'angular-flash-alert';
import flashAlertConfig from './flash-alert.config.js';
import FlashMessageListContainerComponent from './flash-message-container.component.js';
import FlashMessageService from './flash-message.service.js';

const flashMessageList = angular.module('flashMessageList', [
  angularFlashAlert,
])
  .config(flashAlertConfig)
  .component('flashMessageContainer', FlashMessageListContainerComponent)
  .service('FlashMessage', FlashMessageService)
  .name;

export default flashMessageList;
