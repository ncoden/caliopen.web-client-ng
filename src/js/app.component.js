class AppController {
  constructor($ngRedux, ApiFiltersActions) {
    'ngInject';
    this.$ngRedux = $ngRedux;
    this.ApiFiltersActions = ApiFiltersActions;
  }

  $onInit() {
    this.$ngRedux.dispatch(this.ApiFiltersActions.init());
  }
}

const AppComponent = {
  controller: AppController,
  template: `
    <off-canvas>
      <left><navigation-alt></navigation-alt></left>
      <content>
        <div class="l-body">
          <header></header>
          <navigation></navigation>
          <section role="main">
            <div class="l-body__content" ui-view></div>
          </section>
          <div class="l-call-to-action">
            <call-to-action></call-to-action>
          </div>
          <flash-message-container></flash-message-container>
        </div>
      </content>
    </off-canvas>
  `,
};

export default AppComponent;
