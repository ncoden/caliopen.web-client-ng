import { v1 as uuidV1 } from 'uuid';

class SwitchController {
  $onInit() {
    this.id = uuidV1();
  }
}

const SwitchComponent = {
  controller: SwitchController,
  bindings: {
    label: '<',
    model: '<',
    value: '<',
    onChange: '&',
  },
  template: `
    <div class="m-switch switch">
      <input type="checkbox"
        class="switch-input"
        id="{{ $ctrl.id }}"
        ng-value="$ctrl.value"
        ng-model="$ctrl.model"
        ng-change="$ctrl.onChange({ $event: { model: $ctrl.model }})"
      />
      <label class="switch-paddle" for="{{ $ctrl.id }}">
        <span class="show-for-sr">{{ $ctrl.label }}</span>
      </label>
    </label>
  `,
};

export default SwitchComponent;
