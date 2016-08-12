import angular from 'angular';
import callToAction from '../call-to-action';
import flashMessage from '../flash-message';
import header from '../header';
import navigation from '../navigation';
import navigationAlt from '../navigation-alt';
import offCanvas from '../off-canvas';

const layout = angular.module('app.layout', [
  callToAction,
  flashMessage,
  header,
  navigation,
  navigationAlt,
  offCanvas,
]).name;

export default layout;
