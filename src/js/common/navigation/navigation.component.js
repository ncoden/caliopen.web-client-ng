const NavigationComponent = {
  template: `
    <div class="l-navbar m-navbar hide-for-small-only">
      <div class="l-navbar__wrapper" sticky-navbar-class="l-navbar__wrapper--sticky">
        <div class="l-navbar__application-switcher">
          <application-switcher></application-switcher>
        </div>
        <div class="l-navbar__tab-list">
          <tab-list></tab-list>
        </div>
        <div class="l-navbar__sliders-toggle">
          <sliders-container></sliders-container>
        </div>
      </div>
    </div>
  `,
};

export default NavigationComponent;
