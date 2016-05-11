class LayoutSearchFieldController {
}

export const LayoutSearchFieldComponent = {
  controller: LayoutSearchFieldController,
  template: `
    <form class="m-search">
      <div class="m-search-field m-search-field--block l-header__m-search-field">
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
    `,
};
