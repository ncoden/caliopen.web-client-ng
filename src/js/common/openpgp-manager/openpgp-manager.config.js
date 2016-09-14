import openpgp from 'openpgp';

function openPGPManagerConfig() {
  // XXX: it is pretty useless for now in case of key pair generation
  // https://github.com/openpgpjs/openpgpjs/issues/449
  openpgp.initWorker({ path: 'openpgp/dist/openpgp.worker.min.js' });
}

export default openPGPManagerConfig;
