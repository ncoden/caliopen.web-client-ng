import StylesheetHelperService from './stylesheet-helper.service.js';

describe('Service Helper ContactHelper', () => {
  const StylesheetHelper = new StylesheetHelperService();
  describe('getContactStylesheetClass', () => {
    it('make stylesheet class from standard letter', () => {
      expect(StylesheetHelper.getContactStylesheetClass({ title: 'fry' })).toEqual('m-letter--f');
    });

    it('make stylesheet class from non-standard letter', () => {
      expect(StylesheetHelper.getContactStylesheetClass({ title: 'ß-Ligatur' }))
        .toEqual('m-letter--none');
    });
  });
});
