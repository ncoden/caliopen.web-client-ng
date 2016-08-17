const SpinnerComponent = {
  bindings: {
    loading: '<',
  },
  template: `
    <div ng-if="$ctrl.loading" class="m-loading">
      <span class="m-loading__icon">
    </div>
  `,
};

export default SpinnerComponent;
