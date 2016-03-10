class LayoutSearchFieldController {
}

export function LayoutSearchFieldDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: LayoutSearchFieldController,
    bindToController: true,
    controllerAs: 'ctrl',
    template: `
      <form class="nav navbar-nav navbar-form">
        <div class="co-search-field co-layout__header__search-field">
          <input type="text" placeholder="{{'header.menu.search'|translate}}"
            class="co-search-field__input"/>
          <button
            class="co-search-field__button"
            type="button"
            aria-label="{{'header.menu.search'|translate}}"
          ></button>
        </div>
      </form>`,
  };
}
