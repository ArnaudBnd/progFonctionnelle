import actionTypes from './actions-types';

/*
* ADD contact
*/
export const addContact = (contact) => ({
  type: actionTypes.ADD_CONTACT,
  contact
})

/*
* DELETE contact
*/
export const deleteContact = (id) => ({
  type: actionTypes.DELETE_CONTACT,
  id
})

/*
* UPDATE contact
*/
export const updateContact = (text) => ({
  type: actionTypes.UPDATE_CONTACT,
  text
})