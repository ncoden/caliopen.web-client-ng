import angular from 'angular';
import CheckboxFieldComponent from './checkbox-field/checkbox-field.component.js';
import FieldErrorsComponent from './field-errors/field-errors.component.js';
import RadioFieldGroupComponent from './radio-field-group/radio-field-group.component.js';
import SelectFieldGroupComponent from './select-field-group/select-field-group.component.js';
import SwitchComponent from './switch/switch.component.js';
import TextFieldGroupComponent from './text-field-group/text-field-group.component.js';
import TextareaFieldGroupComponent from './textarea-field-group/textarea-field-group.component.js';

const form = angular.module('form', [])
  .component('checkboxField', CheckboxFieldComponent)
  .component('fieldErrors', FieldErrorsComponent)
  .component('radioFieldGroup', RadioFieldGroupComponent)
  .component('selectFieldGroup', SelectFieldGroupComponent)
  .component('switch', SwitchComponent)
  .component('textFieldGroup', TextFieldGroupComponent)
  .component('textareaFieldGroup', TextareaFieldGroupComponent)
  .name;

export default form;
