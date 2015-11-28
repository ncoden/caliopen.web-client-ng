class HeaderController {
  constructor() {
    this.session = { isAuthenticated: true };
  }
}

export function HeaderDirective () {
  return {
    restrict: 'E',
    controller: HeaderController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <header class="caliopen-layout__header">
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed pull-left" data-toggle="collapse"
                data-target="#caliopenLayoutHeaderCollapse" aria-expanded="false" aria-controls="caliopenLayoutHeaderCollapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">
                <img class="caliopen-layout__header__navbar-img--brand" src="images/brand.png" alt="CaliOpen" />
              </a>
            </div>
            <div class="collapse navbar-collapse" id="caliopenLayoutHeaderCollapse">
              <div ng-if="ctrl.session.isAuthenticated">
                <co-layout-application-switcher
                  currentApplication="currentApplication"></co-layout-application-switcher>

                <co-layout-user-menu
                  user="user"
                  currentApplication="currentApplication"
                  logout="logout"></co-layout-user-menu>
              </div>

              <ul ng-if="!ctrl.session.isAuthenticated" class="nav navbar-nav navbar-right">
                <li>
                  <a href="/auth/login" translate="header.menu.signin"></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>`
  };
}
