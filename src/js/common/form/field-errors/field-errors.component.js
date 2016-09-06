const FieldErrorsComponent = {
  bindings: {
    errors: '<',
  },
  template: `
    <ul class="m-field-errors">
      <li ng-repeat="error in $ctrl.errors">{{ error }}</li>
    </ul>
  `,
};

export default FieldErrorsComponent;
