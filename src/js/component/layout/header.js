class HeaderController {
  constructor() {
    'ngInject';
    this.session = { isAuthenticated: true };
  }
}

export const LayoutHeaderComponent = {
  controller: HeaderController,
  /* eslint-disable max-len */
  template: `
    <header class="l-header">
      <div class="l-header__wrapper">
        <div class="l-header__brand">
          <span class="show-for-small-only">
            <button
              class="l-header__menu-icon menu-icon"
              type="button"
              aria-label="{{ 'header.menu.toggle-navigation'|translate }}"
            ></button>
          </span>

          <a ui-sref="front.discussions">
            <img class="l-header__brand-icon" src="images/brand.png" alt="CaliOpen" />
          </a>
        </div>

        <div class="l-header__application-switcher">
          <co-layout-application-switcher ng-if="$ctrl.session.isAuthenticated">
          </co-layout-application-switcher>
        </div>

        <div class="l-header__search-toggler show-for-small-only">
          <button
            ng-click="$ctrl.searchAsDropdown = !$ctrl.searchAsDropdown"
            class="l-header__m-link m-link m-link--button"
            aria-label="{{ 'header.menu.toggle-search-dropdown'|translate }}"
          ><span class="fa fa-search"></span></button>
        </div>

        <div class="l-header__search" ng-class="[{ 'l-header__search--as-dropdown': $ctrl.searchAsDropdown }]">
          <co-layout-search-field ng-if="$ctrl.session.isAuthenticated"></co-layout-search-field>
        </div>

        <div class="l-header__user">
          <co-layout-user-menu ng-if="$ctrl.session.isAuthenticated"></co-layout-user-menu>

          <span ng-if="!$ctrl.session.isAuthenticated" class="">
            <a href="/auth/login"
              translate="header.menu.signin"
              class=""
            ></a>
          </span>
        </div>
      </div>
    </header>`,
  /* eslint-enable max-len */
};
