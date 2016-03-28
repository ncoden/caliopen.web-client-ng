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
      <li class="m-menu__item">
        <form class="m-menu__item-content">
          <span class="co-search-field co-layout__header__search-field">
            <input type="text" placeholder="{{'header.menu.search'|translate}}"
              class="co-search-field__input"/>
            <button
              class="co-search-field__button"
              type="button"
              aria-label="{{'header.menu.search'|translate}}"
            ></button>
          </span>
        </form>
      </li>`,
  };
}
