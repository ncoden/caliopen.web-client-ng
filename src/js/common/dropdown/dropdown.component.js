import { v1 as uuidV1 } from 'uuid';

class DropdownController {
  constructor($document, $scope) {
    'ngInject';
    this.$document = $document;
    this.$scope = $scope;
  }

  $onInit() {
    this.id = uuidV1();

    this.handleDocumentClick = ($event) => {
      if (!this.isVisible) {
        return;
      }

      const dropdown = angular.element(`#${this.id}`);
      const target = $event.target;

      if (dropdown.is(target) || dropdown.find(target).length) {
        return;
      }

      if (
        !!this.ignoreClickSelectors &&
        this.ignoreClickSelectors.find((selector) => {
          const element = angular.element(selector);

          return element.is(target);
        })
      ) {
        return;
      }

      this.$scope.$apply(() => {
        this.close();
      });
    };

    this.$document.on('click', this.handleDocumentClick);

    this.$scope.$on('$destroy', () => {
      this.$document.off('click', this.handleDocumentClick);
    });
  }

  close() {
    this.isVisible = false;
    if (this.onClose) {
      this.onClose({ $event: {} });
    }
  }
}

const DropdownComponent = {
  bindings: {
    isVisible: '<',
    ignoreClickSelectors: '<?',
    onClose: '&?',
  },
  controller: DropdownController,
  transclude: true,
  template: `
    <div ng-if="$ctrl.isVisible"
      class="m-dropdown"
      ng-class="{ 'is-open': $ctrl.isVisible }"
      id="{{ $ctrl.id }}" ng-transclude
    ></div>
  `,
};

export default DropdownComponent;
