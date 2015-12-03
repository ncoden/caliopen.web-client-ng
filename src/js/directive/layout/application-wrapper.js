const APPLICATION_DISCUSSION = 'discussion';
const APPLICATION_CONTACT = 'contact';

class LayoutApplicationWrapperController {
  /* @ngInject */
  constructor($state) {
    this.currentStateName = $state.current.name;
    if ($state.includes('front.discussions')) {
      this.currentApplication = APPLICATION_DISCUSSION;
    }

    if ($state.includes('front.contacts')) {
      this.currentApplication = APPLICATION_CONTACT;
    }
  }
}
export function LayoutApplicationWrapperDirective() {
  return {
    scope: {},
    controller: LayoutApplicationWrapperController,
    bindToController: true,
    controllerAs: 'ctrl',
    template: `
      <section role="main" class="container-fluid caliopen-layout__main-container">
        <div class="caliopen-layout__main-topbar row">
          <div class="caliopen-layout__main-topbar__block--action col-md-2" ng-switch="ctrl.currentApplication">
            <a ng-switch-when="discussion"
              ui-sref="front.discussions.create"
              class="btn btn-info btn-lg"
              title="{{ 'header.menu.compose'|translate }}">
              <i class="fa fa-plus" />
              {{ 'header.menu.compose'|translate }}
            </a>
            <a ng-switch-when="contact"
              ui-sref="front.contacts.create"
              class="btn btn-info btn-lg"
              title="{{ 'header.menu.compose'|translate }}">
              <i class="fa fa-plus" />
              {{ 'header.menu.compose'|translate }}
            </a>
          </div>
          <div class="caliopen-layout__main-topbar__block--privacy col-md-10">
            <co-layout-privacy-index-slider></co-layout-privacy-index-slider>
          </div>
        </div>

        <div class="row">
          <div class="caliopen-layout__block--importance col-md-1 hidden-sm hidden-xs">
            <co-layout-importance-level-slider></co-layout-importance-level-slider>
          </div>
          <div class="caliopen-layout__block--container col-md-11 col-sm-12 col-xs-12">
            <co-layout-tab-list currentApplication=currentApplication remove="closeTab"></co-layout-tab-list>
            <div class="caliopen-layout__main-content" ng-switch="ctrl.currentStateName">
              <div ng-switch-when="front.discussions">
                <co-discussions></co-discussions>
              </div>
              <div ng-switch-when="front.discussions.thread">
                <co-thread></co-thread>
              </div>
              <div ng-switch-when="front.contacts">
                <co-contacts></co-contacts>
              </div>
            </div>
          </div>
        </div>
      </section>`
  };
}
