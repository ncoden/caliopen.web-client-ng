class LayoutApplicationSwitcherController {

}

export function LayoutApplicationSwitcherDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: LayoutApplicationSwitcherController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <ul class="nav navbar-nav">
        <li class="dropdown">
          <a href class="dropdown-toggle" data-toggle="dropdown"
             role="button" aria-haspopup="true" aria-expanded="false">
            {{ctrl.currentApplication}} <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a ui-sref="front.discussions">
                <i class="fa fa-envelope" />
                {{ 'header.menu.discussions'|translate}}
              </a>
            </li>
            <li>
              <a ui-sref="front.contacts">
                <i class="fa fa-users" />
                {{ 'header.menu.contacts'|translate}}
              </a>
            </li>
          </ul>
        </li>
      </ul>`
  };
}
