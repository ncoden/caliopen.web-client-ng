/* eslint-disable max-len */
import { protocolStylesheetClassFilter } from '../../../src/js/filter/protocol-stylesheet-class.js';
import { protocolsConfig } from '../../../src/js/config/protocols-config.js';

describe('protocolStylesheetClass Filter', () => {
  const protocolStylesheetClass = protocolStylesheetClassFilter(protocolsConfig);

  it('should be unknown', inject(() => {
    expect(protocolStylesheetClass(undefined)).toEqual('fa-question-circle');
  }));

  it('should be email', inject(() => {
    expect(protocolStylesheetClass({ type: 'email' })).toEqual('fa-envelope');
  }));
});
