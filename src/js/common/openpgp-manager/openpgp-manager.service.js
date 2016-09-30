import openpgp, * as module from 'openpgp';

const GENERATE_KEY_OPTIONS = {
  numBits: 4096,
};

class OpenPGPManager {
  constructor($q, $translate) {
    'ngInject';
    this.$q = $q;
    this.$translate = $translate;
  }

  getOpenPGP() {
    return openpgp;
  }

  // http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
  encodeUTF8(str) {
    return unescape(encodeURIComponent(str));
  }

  decodeUTF8(str) {
    return decodeURIComponent(escape(str));
  }

  generateKey(name, email, passphrase, options = {}) {
    return openpgp.generateKey({
      ...GENERATE_KEY_OPTIONS,
      ...options,
      userIds: [{ name: this.encodeUTF8(name), email }],
      passphrase,
    });
  }

  getKeyFromASCII(armored) {
    return module.key.readArmored(armored).keys[0];
  }

  encrypt({ content, recipientPubKeys }, key) {
    const options = {
      data: content,
      publicKeys: recipientPubKeys.reduce(
        (prev, pubkey) => [...prev, ...module.key.readArmored(pubkey).keys],
        []
      ),
      privateKeys: [key],
    };

    return openpgp.encrypt(options);
  }

  decrypt({ content, authorPubKeys = [] }, key) {
    const options = {
      message: openpgp.message.readArmored(content),
      publicKeys: authorPubKeys.reduce(
        (prev, pubkey) => [...prev, ...module.key.readArmored(pubkey).keys],
        []
      ),
      privateKey: key,
    };

    openpgp.decrypt(options);
  }

  validatePublicKeyChain(publicKeyArmored) {
    return this.$q.all({
      unableReadPublicKey: this.$translate('openpgp.feedback.unable-read-public-key'),
      publicKey: this.$q.when(this.getKeyFromASCII(publicKeyArmored)),
    }).then((resolved) => {
      const { publicKey } = resolved;

      if (!publicKey) {
        return this.$q.reject({ publicKeyArmored: [resolved.unableReadPublicKey] });
      }

      return { key: publicKey, publicKeyArmored };
    });
  }

  validateKeyChainPair(publicKeyArmored, privateKeyArmored) {
    return this.$q.all({
      unableReadPublicKey: this.$translate('openpgp.feedback.unable-read-public-key'),
      unableReadPrivateKey: this.$translate('openpgp.feedback.unable-read-private-key'),
      fingerprintsDoNotMatch: this.$translate('openpgp.feedback.fingerprints-not-match'),
      publicKey: this.$q.when(this.getKeyFromASCII(publicKeyArmored)),
      privateKey: this.$q.when(this.getKeyFromASCII(privateKeyArmored)),
    }).then((resolved) => {
      const { publicKey, privateKey } = resolved;

      let errors;
      if (!publicKey) {
        errors = { ...errors, publicKeyArmored: [resolved.unableReadPublicKey] };
      }

      if (!privateKey) {
        errors = { ...errors, privateKeyArmored: [resolved.unableReadPrivateKey] };
      }

      if (
        !!publicKey && !!privateKey &&
        publicKey.primaryKey.fingerprint !== privateKey.primaryKey.fingerprint
      ) {
        errors = { ...errors, global: [resolved.fingerprintsDoNotMatch] };
      }

      if (!!errors) {
        return this.$q.reject(errors);
      }

      return { key: publicKey, publicKeyArmored, privateKeyArmored };
    });
  }
}

export default OpenPGPManager;
