function flashAlertConfig(FlashProvider) {
  'ngInject';
  FlashProvider.setTemplatePreset('transclude');
  FlashProvider.setTimeout(0);
}

export default flashAlertConfig;
