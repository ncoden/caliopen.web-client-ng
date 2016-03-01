import {ContactHelper} from '../../../../src/js/service/helper/contact-helper.js';

describe('Service Helper ContactHelper', () => {
  let contactHelper = new ContactHelper();
  describe('getContactStylesheetClass', () => {

    it('make stylesheet class from standard letter', () => {
      expect(contactHelper.getContactStylesheetClass({ title: 'fry'})).toEqual('co-letter--F');
    });

    it('make stylesheet class from non-standard letter', () => {
      expect(contactHelper.getContactStylesheetClass({ title: 'ß-Ligatur'})).toEqual('co-letter--none');
    });
  });
});
