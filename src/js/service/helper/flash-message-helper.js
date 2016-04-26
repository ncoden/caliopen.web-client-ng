export class FlashMessageHelper {
  constructor(Flash) {
    'ngInject';
    this._Flash = Flash;
  }

  message(message, options = {}) {
    this._Flash.create(
      options.type,
      message,
      options.timeout,
      { },
      options.showClose
    );
  }

  success(message, _options = {}) {
    const options = _options;
    options.type = 'success';
    this.message(message, options);
  }

  info(message, _options = {}) {
    const options = _options;
    options.type = 'info';
    this.message(message, options);
  }

  warning(message, _options = {}) {
    const options = _options;
    options.type = 'warning';
    this.message(message, options);
  }

  alert(message, _options = {}) {
    const options = _options;
    options.type = 'alert';
    this.message(message, options);
  }
}
