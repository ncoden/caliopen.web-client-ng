const AppComponent = {
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
