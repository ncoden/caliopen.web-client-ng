export function uiSelectCfg(uiSelectConfig) {
  'ngInject';
  // eslint-disable-next-line no-param-reassign
  uiSelectConfig.theme = 'caliopen';
}

export function uiSelectTemplate($templateCache) {
  'ngInject';
  /* eslint-disable max-len */
  $templateCache.put('caliopen/select.tpl.html', `
    <div class="ui-select-container m-ui-select" ng-class="{'open': $select.open}">
      <div class="m-ui-select__input"
           ng-class="{'focus': $select.open, 'disabled': $select.disabled, 'm-ui-select__input--focus' : $select.focus}"
           ng-click="$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()">
        <div class="ui-select-match"></div>
        <input type="search" autocomplete="off" tabindex="-1"
               class="ui-select-search ui-select-toggle"
               ng-click="$select.toggle($event)"
               placeholder="{{$select.placeholder}}"
               ng-model="$select.search"
               ng-hide="!$select.searchEnabled || ($select.selected && !$select.open)"
               ng-disabled="$select.disabled"
               aria-label="{{ $select.baseTitle }}">
        <span class="fa fa-caret-down"></span>
      </div>
      <div class="ui-select-choices"></div>
    </div>
  `);
  $templateCache.put('caliopen/match.tpl.html', `
    <div ng-hide="$select.searchEnabled && ($select.open || $select.isEmpty())" class="ui-select-match m-ui-select__match" ng-transclude></div>
  `);
  $templateCache.put('caliopen/choices.tpl.html', `
    <div ng-show="$select.open" class="ui-select-choices ui-select-dropdown m-ui-select__choices">
      <div class="ui-select-choices-content selectize-dropdown-content">
        <div class="ui-select-choices-group optgroup" role="listbox">
          <div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header" ng-bind="$group.name"></div>
          <div role="option" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}">
            <div class="m-ui-select__option ui-select-choices-row-inner" data-selectable></div>
          </div>
        </div>
      </div>
    </div>
  `);
  /* eslint-enable max-len */
}
