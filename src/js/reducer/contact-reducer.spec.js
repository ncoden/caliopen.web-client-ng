import contactReducer from './contact-reducer.js';
import * as actions from '../../../src/js/action/action-types.js';

describe('Reducer Thread Reducer', () => {
  const initialState = contactReducer();

  it('init state', () => {
    expect(initialState).toEqual({
      isFetching: false,
      contacts: [],
      contactsById: {},
      contactDetailFormsById: {},
      protocolsById: {},
      totalContacts: 0,
      didInvalidate: false,
    });
  });

  describe('reduce RECEIVE_CONTACTS', () => {
    it('reduce empty state', () => {
      const action = {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '1', name: 'foo' },
            { contact_id: '2', name: 'bar' },
            { contact_id: '4', name: 'baz' },
          ],
        },
      };
      const state = contactReducer(initialState, action);
      expect(state.contactsById).toEqual({
        1: { contact_id: '1', name: 'foo' },
        2: { contact_id: '2', name: 'bar' },
        4: { contact_id: '4', name: 'baz' },
      });
      expect(state.contacts).toEqual(['1', '2', '4']);
    });

    it('reduce living state', () => {
      const livingState = contactReducer(initialState, {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '3', name: 'foo' },
          ],
        },
      });

      const action = {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '1', name: 'foo' },
            { contact_id: '2', name: 'bar' },
            { contact_id: '4', name: 'baz' },
          ],
        },
      };
      const state = contactReducer(livingState, action);
      expect(state.contactsById).toEqual({
        1: { contact_id: '1', name: 'foo' },
        2: { contact_id: '2', name: 'bar' },
        3: { contact_id: '3', name: 'foo' },
        4: { contact_id: '4', name: 'baz' },
      });
      expect(state.contacts.sort()).toEqual(['1', '2', '3', '4']);
    });

    it('reduce invalidated state', () => {
      const livingState = contactReducer(contactReducer(initialState, {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '3', name: 'foo' },
          ],
        },
      }), {
        type: actions.INVALIDATE_CONTACTS,
        payload: {},
      });

      const action = {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '1', name: 'foo' },
            { contact_id: '2', name: 'bar' },
            { contact_id: '4', name: 'baz' },
          ],
        },
      };
      const state = contactReducer(livingState, action);
      expect(state.contactsById).toEqual({
        1: { contact_id: '1', name: 'foo' },
        2: { contact_id: '2', name: 'bar' },
        4: { contact_id: '4', name: 'baz' },
      });
      expect(state.contacts.sort()).toEqual(['1', '2', '4']);
    });
  });

  it('reduce RECEIVE_CONTACT', () => {

  });

  it('reduce INVALIDATE_CONTACTS', () => {
    const livingState = contactReducer(initialState, {
      type: actions.RECEIVE_CONTACTS,
      payload: {
        contacts: [
          { contact_id: '1', name: 'foo' },
          { contact_id: '2', name: 'bar' },
          { contact_id: '4', name: 'baz' },
        ],
      },
    });

    const action = {
      type: actions.INVALIDATE_CONTACTS,
      payload: { },
    };
    const state = contactReducer(livingState, action);
    expect(state.didInvalidate).toEqual(true);
    expect(state.contactsById).toEqual({
      1: { contact_id: '1', name: 'foo' },
      2: { contact_id: '2', name: 'bar' },
      4: { contact_id: '4', name: 'baz' },
    });
    expect(state.contacts.sort()).toEqual(['1', '2', '4']);
  });

  describe('reduce ADD_CONTACT_DETAIL', () => {
    it('reduce fail', () => {

    });

    it('reduce success', () => {

    });
  });

  describe('reduce CONTACT_NOT_FOUND', () => {
    it('reduce known id', () => {
      const livingState = contactReducer(initialState, {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '1', name: 'foo' },
            { contact_id: '2', name: 'bar' },
            { contact_id: '4', name: 'baz' },
          ],
        },
      });

      const action = {
        type: actions.CONTACT_NOT_FOUND,
        payload: { contactId: '2' },
      };
      const state = contactReducer({ ...livingState, isFetching: true }, action);
      expect(state.isFetching).toEqual(false);
      expect(state.contactsById).toEqual({
        1: { contact_id: '1', name: 'foo' },
        4: { contact_id: '4', name: 'baz' },
      });
      expect(state.contacts.sort()).toEqual(['1', '4']);
    });

    it('reduce unknown id', () => {
      const livingState = contactReducer(initialState, {
        type: actions.RECEIVE_CONTACTS,
        payload: {
          contacts: [
            { contact_id: '1', name: 'foo' },
            { contact_id: '2', name: 'bar' },
            { contact_id: '4', name: 'baz' },
          ],
        },
      });

      const action = {
        type: actions.CONTACT_NOT_FOUND,
        payload: { contactId: '3' },
      };
      const state = contactReducer({ ...livingState, isFetching: true }, action);
      expect(state.isFetching).toEqual(false);
      expect(state.contactsById).toEqual({
        1: { contact_id: '1', name: 'foo' },
        2: { contact_id: '2', name: 'bar' },
        4: { contact_id: '4', name: 'baz' },
      });
      expect(state.contacts.sort()).toEqual(['1', '2', '4']);
    });
  });
});
