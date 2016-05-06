class LayoutSearchFieldController {
}

export const LayoutSearchFieldComponent = {
  controller: LayoutSearchFieldController,
  template: `
    <li class="l-header__m-menu__item m-menu__item">
      <form class="l-header__m-menu__item-content m-menu__item-content">

        <div class="l-header__m-search-field m-search-field">
          <input type="text"
            placeholder="{{'header.menu.search'|translate}}"
            class="m-search-field__input m-text-field"
          />
          <button
            class="m-search-field__button fa fa-search"
            type="button"
            aria-label="{{'header.menu.search'|translate}}"
          ></button>
        </div>

      </form>
    </li>`,
};
