import actionsTypes from './actions-types';
import { List } from 'immutable';

const CONSTANTS = {
  addContact: actionsTypes.ADD_CONTACT,
  deleteContact: actionsTypes.DELETE_CONTACT,
  updateContact: actionsTypes.UPDATE_CONTACT,
  searchContact: actionsTypes.SEARCH_CONTACT,
};

const initialState = {
  items: [{
    id: 0,
    firstname: 'Cyril',
    lastname: 'Vimard',
    phone: '0818882294',
    city: 'Paris'
  },{
    id: 1,
    firstname: 'Elies',
    lastname: 'Amar',
    phone: '0618882294',
    city: 'Paris'
  }],
};


/*
 ** ADD Contact
 */
const addContact = (state, newContact) => {
  return List(state).push(newContact.contact).toJS()
}

/*
 ** DELETE Contact
 */
const deleteContact = (state, action) => {
  return List(state).remove(action.id)
};

/*
 ** SEARCH Contact
 */
const searchContact = (state, action) => {
  // console.log('state', state)
  // console.log('action', action)
  return action.text
};

/*
 ** UPDATE Contact
 */
const updateContact = (state, action) => {
  const { text } = action
  const updateContact = List(state).update(text.id, (contact) => {
    contact.firstname = text.firstname
    contact.lastname = text.lastname
    contact.phone = text.phone
    contact.city = text.city

    return contact
  })

  return List(state).set(updateContact).toJS()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.addContact:
      return addContact(state, action)
    case CONSTANTS.deleteContact:
      return deleteContact(state, action)
    case CONSTANTS.updateContact:
      return updateContact(state, action)
    case CONSTANTS.searchContact:
      return searchContact(state, action)
    default:
      return state.items;
  }
}












