class HeaderController {
  constructor($window) {
    'ngInject';
    this.$window = $window;
    this.session = { isAuthenticated: true };
  }

  $postLink() {
    // eslint-disable-next-line no-new
    new this.$window.Foundation.OffCanvas(angular.element('#left_off_canvas'), {});
  }
}

const HeaderComponent = {
  controller: HeaderController,
  /* eslint-disable max-len */
  template: `
    <div class="l-header">
      <div class="l-header__wrapper">
        <div class="l-header__brand">
          <span class="show-for-small-only">
            <button
              class="l-header__menu-icon menu-icon"
              type="button"
              data-toggle="left_off_canvas"
              aria-label="{{ 'header.menu.toggle-navigation'|translate }}"
            ></button>
          </span>

          <a ui-sref="discussions">
            <img class="l-header__brand-icon" src="images/brand.png" alt="CaliOpen" />
          </a>
        </div>

        <div class="l-header__search-toggler show-for-small-only">
          <button
            ng-click="$ctrl.searchAsDropdown = !$ctrl.searchAsDropdown"
            class="l-header__m-link m-link m-link--button"
            aria-label="{{ 'header.menu.toggle-search-form'|translate }}"
          ><span class="fa fa-search"></span></button>
        </div>

        <div class="l-header__search" ng-class="[{ 'l-header__search--as-dropdown': $ctrl.searchAsDropdown }]">
          <search-field ng-if="$ctrl.session.isAuthenticated"></search-field>
        </div>

        <div class="l-header__user">
          <user-menu ng-if="$ctrl.session.isAuthenticated"></user-menu>

          <span ng-if="!$ctrl.session.isAuthenticated" class="">
            <a href="/auth/login"
              translate="header.menu.signin"
              class=""
            ></a>
          </span>
        </div>
      </div>
    </div>
  `,
  /* eslint-enable max-len */
};

export default HeaderComponent;
