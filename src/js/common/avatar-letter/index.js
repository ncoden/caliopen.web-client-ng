import angular from 'angular';
import AvatarLetterComponent from './avatar-letter.component.js';
import stylesheetHelper from '../stylesheet-helper';

const avatarLetter = angular.module('avatarLetter', [stylesheetHelper])
  .component('avatarLetter', AvatarLetterComponent)
  .name;

export default avatarLetter;
