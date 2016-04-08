import { ContactHelper } from '../../../../src/js/service/helper/contact-helper.js';

describe('Service Helper ContactHelper', () => {
  const contactHelper = new ContactHelper();
  describe('getContactStylesheetClass', () => {
    it('make stylesheet class from standard letter', () => {
      expect(contactHelper.getContactStylesheetClass({ title: 'fry' })).toEqual('m-letter--f');
    });

    it('make stylesheet class from non-standard letter', () => {
      expect(contactHelper.getContactStylesheetClass({ title: 'ß-Ligatur' }))
        .toEqual('m-letter--none');
    });
  });
});
