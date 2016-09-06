import { v1 as uuidV1 } from 'uuid';

const DEFAULT_PROPS = {
  'bottom-space': true,
};


class RadioFieldGroupController {
  $onInit() {
    this.name = uuidV1();
    this.props = { ...DEFAULT_PROPS, ...this.props };
  }
}

const RadioFieldGroupComponent = {
  bindings: {
    props: '<',
    model: '<',
    options: '<',
    errors: '<?',
    required: '@?',
    onChange: '&',
  },
  controller: RadioFieldGroupController,
  template: `
    <div class="m-radio-field-group"
      ng-class="{ 'm-radio-field-group--bottom-space': $ctrl.props['bottom-space']}"
    >
      <label ng-repeat="option in $ctrl.options" class="m-radio-field-group__entry">
        <input
          type="radio"
          name="{{ $ctrl.name }}"
          ng-model="$ctrl.model"
          ng-value="option.value"
          ng-change="$ctrl.onChange({ $event: { model: $ctrl.model } })"
          ng-class="$ctrl.inputStylesheets"
        />
        {{ option.label || option }}
      </label>
      <div ng-if="$ctrl.errors.length" class="m-radio-field-group__errors">
        <field-errors errors="$ctrl.errors"></field-errors>
      </div>
    </div>
  `,
};

export default RadioFieldGroupComponent;
