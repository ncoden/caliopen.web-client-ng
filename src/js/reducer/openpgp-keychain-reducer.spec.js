import openPGPKeychainReducer from './openpgp-keychain-reducer.js';
import * as actions from '../action/action-types.js';

describe('Reducer openPGPKeychain', () => {
  describe('reduce OPENPGP_RECEIVE_ALL', () => {
    it('reduce private key', () => {
      const action = {
        type: actions.OPENPGP_RECEIVE_ALL,
        payload: {
          keychainByFingerprint: {
            aef123: {
              publicKeyArmored: '-----BEGIN PGP PUBLIC KEY BLOCK----- ...',
              privateKeyArmored: '-----BEGIN PGP PRIVATE KEY BLOCK----- ...',
            },
          },
        },
      };

      const state = openPGPKeychainReducer(undefined, action);
      expect(state.keychainByFingerprint).toEqual(action.payload.keychainByFingerprint);
      expect(state.privateKeys).toEqual(['aef123']);
    });

    it('reduce public key only', () => {
      const action = {
        type: actions.OPENPGP_RECEIVE_ALL,
        payload: {
          keychainByFingerprint: {
            aef123: {
              publicKeyArmored: '-----BEGIN PGP PUBLIC KEY BLOCK----- ...',
            },
          },
        },
      };

      const state = openPGPKeychainReducer(undefined, action);
      expect(state.keychainByFingerprint).toEqual(action.payload.keychainByFingerprint);
      expect(state.privateKeys).toEqual([]);
    });
  });

  describe('reduce OPENPGP_IMPORT*', () => {
    it('reduce OPENPGP_IMPORT_KEY_PAIR', () => {
      const action = {
        type: actions.OPENPGP_IMPORT_KEY_PAIR,
        payload: {
          publicKeyArmored: '-----BEGIN PGP PUBLIC KEY BLOCK----- ...',
          privateKeyArmored: '-----BEGIN PGP PRIVATE KEY BLOCK----- ...',
        },
      };

      const state = openPGPKeychainReducer(undefined, action);
      expect(state.importForm).toEqual({ ...action.payload, errors: {} });
    });

    it('reduce OPENPGP_IMPORT_PUBLIC_KEY', () => {
      const action = {
        type: actions.OPENPGP_IMPORT_PUBLIC_KEY,
        payload: {
          publicKeyArmored: '-----BEGIN PGP PUBLIC KEY BLOCK----- ...',
        },
      };

      const state = openPGPKeychainReducer(undefined, action);
      expect(state.importForm).toEqual({ ...action.payload, errors: {} });
    });

    it('reduce OPENPGP_IMPORT_FAILED', () => {
      const action = {
        type: actions.OPENPGP_IMPORT_FAILED,
        payload: {
          errors: {
            publicKeyArmored: ['failed'],
          },
        },
      };

      const state = openPGPKeychainReducer(undefined, action);
      expect(state.importForm).toEqual({ errors: action.payload.errors });
    });

    it('reduce OPENPGP_IMPORT_CANCEL', () => {
      const action = {
        type: actions.OPENPGP_IMPORT_FAILED,
        payload: {
          errors: {
            publicKeyArmored: ['failed'],
          },
        },
      };

      const livingState = openPGPKeychainReducer(undefined, action);
      const state = openPGPKeychainReducer(livingState, {
        type: actions.OPENPGP_IMPORT_CANCEL,
        payload: {},
      });
      expect(state.importForm).toEqual({ errors: {} });
    });

    it('reduce OPENPGP_IMPORT_SUCCEED', () => {
      const action = {
        type: actions.OPENPGP_IMPORT_PUBLIC_KEY,
        payload: {
          publicKeyArmored: '-----BEGIN PGP PUBLIC KEY BLOCK----- ...',
        },
      };

      const livingState = openPGPKeychainReducer(undefined, action);
      const state = openPGPKeychainReducer(livingState, {
        type: actions.OPENPGP_IMPORT_SUCCEED,
        payload: {},
      });
      expect(state.importForm).toEqual({ errors: {} });
    });
  });
});
