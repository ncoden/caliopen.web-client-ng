class HeaderController {
  constructor() {
    'ngInject';
    this.session = { isAuthenticated: true };
  }
}

export const HeaderComponent = {
  controller: HeaderController,
  /* eslint-disable max-len */
  template: `
    <header class="l-header">
      <div class="l-header__wrapper">
        <span class="l-header__brand">
          <span data-responsive-toggle="co-header-menu" data-hide-for="medium">
            <button class="l-header__menu-icon menu-icon" type="button" data-toggle></button>
          </span>

          <a ui-sref="front.discussions">
            <img class="l-header__brand-icon" src="images/brand.png" alt="CaliOpen" />
          </a>
        </span>

        <ul class="l-header__m-menu m-menu" id="co-header-menu">
          <co-layout-application-switcher ng-if="$ctrl.session.isAuthenticated"></co-layout-application-switcher>
          <co-layout-search-field ng-if="$ctrl.session.isAuthenticated"></co-layout-search-field>

          <li class="l-header__user">
            <co-layout-user-menu ng-if="$ctrl.session.isAuthenticated"></co-layout-user-menu>

            <span ng-if="!$ctrl.session.isAuthenticated" class="l-header__m-menu__item m-menu__item">
              <a href="/auth/login" translate="header.menu.signin" class="l-header__m-menu__item-content m-menu__item-content m-menu__item-content--link"></a>
            </span>
          </li>
        </ul>
      </div>
    </header>`,
  /* eslint-enable max-len */
};
