import React from 'react';
import { connect } from 'react-redux';

import { addContact, deleteContact, updateContact, searchContact, initialContact } from './actions';

const Contact = ({ contacts, id, firstname, lastname, phone, city, dispatch }) => {
  return (
        <div className="card card-default" id="card_contacts">
            <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                <ul className="list-group pull-down" id="contact-list">
                    <li className="list-group-item">
                        <div className="row w-100">
                            <div className="col-12 col-sm-6 col-md-3 px-0">
                                <img src={"http://demos.themes.guide/bodeo/assets/images/users/m10"+ id +".jpg"} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                                <span className="fa fa-mobile fa-2x text-success float-right pulse" title="online now"></span>
                                <button
                                  type="button"
                                  className="close"
                                  aria-label="Close"
                                  onClick={() => dispatch(deleteContact(id))}>
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <span className="text-muted small">{`${lastname}`}</span>
                                <br />
                                <label className="name lead">{`${firstname}`}</label>
                                <br /> 
                                <span className="text-muted small">{`${phone}`}</span>
                                <br />
                                <span className="text-muted small">{`${city}`}</span>
                                <br />
                                <button
                                  type="button"
                                  className="close"
                                  aria-label="Close"
                                  onClick={() => editContact(id, dispatch)}>
                                  <span aria-hidden="true">editer</span>
                                </button>
                            </div>
                        </div>
                    </li>
                 </ul>
            </div>
        </div>
  )
};

const onSubmit = (e, dispatch, contacts ) => {
  e.preventDefault()

  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var phone = document.getElementById("phone").value;
  var city = document.getElementById("city").value;

  const contact = {
    'id': contacts.length,
    'firstname': firstname,
    'lastname': lastname,
    'phone': phone,
    'city': city
  }

  if(firstname === "" || lastname === "" || phone === "" || city === "") {
    alert('remplir les champs')
  } else {
    dispatch(addContact(contact))
  }
}

const SearchContact = ({ dispatch, contacts }) => {
  return (
    <div className="form-group">
      <label htmlFor="city">search :</label>
      <input type="text" className="form-control" onChange={e => onChange(e, dispatch, contacts)} />
    </div>
  )
}

const onChange = (e, dispatch, contacts) => {
  const searchText = e.target.value
  const searchFirstname = contacts.filter(contact => contact.firstname.toLowerCase().indexOf(searchText) !== -1)

  if(searchFirstname != "" && searchText != "") {
    dispatch(searchContact(searchFirstname))
  } else {
    dispatch(initialContact(contacts))
  }
}

const editContact = (id, dispatch) => {
  const mock = {
    id: id,
    firstname: 'Sercan',
    lastname: 'Yildiz',
    phone: '0380238',
    city: 'Marseille'
  }

  dispatch(updateContact(mock))
}

const FormCreateContact = ({ dispatch, contacts }) => {
  return (
    <div>
      <h1>Ajoutez un contact</h1>
      <form onSubmit={e => onSubmit(e, dispatch, contacts )}>
        <div className="form-group">
          <label htmlFor="firstname">firstname :</label>
          <input type="text" className="form-control" id="firstname" placeholder="Enter firstname" />
        </div>
        <div className="form-group">
          <label>lastname  :</label>
          <input type="text" className="form-control" id="lastname" placeholder="Enter lastname" />
        </div>
        <div className="form-group">
          <label>phone :</label>
          <input type="text" className="form-control" id="phone" placeholder="Enter phone" />
        </div>
        <div className="form-group">
          <label>city :</label>
          <input type="text" className="form-control" id="city" placeholder="Enter city" />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Create contact
        </button>
    </form>
  </div>
  )
}

const Contacts = ({ dispatch, contacts }) => {
  console.log('contacts render', contacts)

  return (
    <div>
      <ul>
        <div className="container">
          <FormCreateContact dispatch={dispatch} contacts={contacts} />
          <br />
          <SearchContact dispatch={dispatch} contacts={contacts} />
          <br />
          {contacts.map((user, id) => (
            <Contact contacts={contacts} dispatch={dispatch} id={user.id} firstname={user.firstname} lastname={user.lastname} phone={user.phone} city={user.city}/>
          ))}
        </div>
      </ul>
    </div>
  )
};

const mapStateToProps = (state) => {
  const { contacts } = state;
  return ({ contacts });
}

export default connect(mapStateToProps)(Contacts);
