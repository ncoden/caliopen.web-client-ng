export class ContactHelper {
  getContactStylesheetClass(contact, defaultLetter = 'none') {
    const title = contact.title || contact.address;
    let letter = defaultLetter;

    if (!!title) {
      letter = title.substr(0, 1).toUpperCase();
    }

    if ('abcdefghijklmnopqrstuvwxyz'.toUpperCase().indexOf(letter) === -1) {
      letter = 'none';
    }

    return this.getStylesheetClass(letter);
  }

  getStylesheetClass(letter = 'none') {
    return `co-letter--${letter}`;
  }
}
