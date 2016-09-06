import { v1 as uuidV1 } from 'uuid';

const DEFAULT_PROPS = {
  expanded: true,
  theme: 'dark',
  'bottom-space': true,
};

class TextFieldGroupController {
  $onInit() {
    this.id = uuidV1();

    this.props = { ...DEFAULT_PROPS, ...this.props };
    this.inputStylesheets = {
      'm-text-field-group__input--expanded': this.props.expanded,
      'm-text-field-group__input--bottom-space': this.props['bottom-space'],
    };
  }
}

const TextFieldGroupComponent = {
  bindings: {
    props: '<',
    label: '<',
    model: '<',
    errors: '<?',
    required: '@?',
    onChange: '&',
  },
  controller: TextFieldGroupController,
  template: `
    <div class="m-text-field-group">
      <label for="{{ $ctrl.id }}" class="m-text-field-group__label">
        {{ $ctrl.label }}
      </label>
      <input ng-model="$ctrl.model"
        ng-change="$ctrl.onChange({ $event: { model: $ctrl.model } })"
        type="text"
        class="m-text-field-group__input"
        ng-class="$ctrl.inputStylesheets"
        ng-required="$ctrl.required"
        id="{{ $ctrl.id }}" />
      <div class="m-text-field-group__errors" ng-if="$ctrl.errors.length">
        <field-errors errors="$ctrl.errors"></field-errors>
      </div>
    </div>
  `,
};

export default TextFieldGroupComponent;
