const NAMESPACE = 'openpgp';

export class OpenPGPKeychainRepository {

  constructor(LocalStorageHelper) {
    'ngInject';
    this.LocalStorageHelper = LocalStorageHelper;
  }

  getPrimaryKeysByFingerprint() {
    return this.LocalStorageHelper.findAll(NAMESPACE)
      .reduce((prev, { id, value }) => {
        const fingerprint = id.replace('publicKeyArmored.', '')
          .replace('privateKeyArmored.', '');
        const keyType = id.replace(`.${fingerprint}`, '');

        return {
          ...prev,
          [fingerprint]: {
            ...prev[fingerprint],
            [keyType]: value,
          },
        };
      }, {});
  }

  saveKey(fingerprint, publicKeyArmored, privateKeyArmored) {
    this.LocalStorageHelper
      .save(NAMESPACE, `publicKeyArmored.${fingerprint}`, publicKeyArmored);
    this.LocalStorageHelper
      .save(NAMESPACE, `privateKeyArmored.${fingerprint}`, privateKeyArmored);
  }

  deleteKey(fingerprint) {
    this.LocalStorageHelper.remove(NAMESPACE, `publicKeyArmored.${fingerprint}`);
    this.LocalStorageHelper.remove(NAMESPACE, `privateKeyArmored.${fingerprint}`);
  }
}
