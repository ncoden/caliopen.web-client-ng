const DEFAULT_PROPS = {
  size: undefined,
};

export class AvatarLetterController {
  constructor(StylesheetHelper) {
    'ngInject';
    this.StylesheetHelper = StylesheetHelper;
  }

  $onInit() {
    this.props = !!this.props && { ...DEFAULT_PROPS, ...this.props } || { ...DEFAULT_PROPS };
    this.letterStylesheet = this.StylesheetHelper.getContactStylesheetClass(this.contact);
  }

  getBlockModifierStylesheet() {
    if (!!this.props.size) {
      return `m-avatar--${this.props.size}`;
    }

    return '';
  }

  getElementModifierStylesheet() {
    const blockModifier = this.getBlockModifierStylesheet();

    if (!!blockModifier) {
      return `${blockModifier}__letter`;
    }

    return '';
  }
}

const AvatarLetterComponent = {
  bindings: {
    contact: '<',
    props: '<?',
  },
  controller: AvatarLetterController,
  template: `
    <div class="m-avatar"
      ng-class="$ctrl.getBlockModifierStylesheet()"
    >
      <div
        class="m-avatar__letter"
        ng-class="[$ctrl.letterStylesheet, $ctrl.getElementModifierStylesheet()]"
      ></div>
    </div>`,
};

export default AvatarLetterComponent;
