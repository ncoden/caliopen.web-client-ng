class StylesheetHelper {
  getContactStylesheetClass(contact, defaultLetter = 'none') {
    const title = contact.title || contact.address;
    let letter = defaultLetter;

    if (!!title) {
      letter = title.substr(0, 1).toLowerCase();
    }

    if ('abcdefghijklmnopqrstuvwxyz'.indexOf(letter) === -1) {
      letter = 'none';
    }

    return this.getStylesheetClass(letter);
  }

  getStylesheetClass(letter = 'none') {
    return `m-letter--${letter}`;
  }
}

export default StylesheetHelper;
