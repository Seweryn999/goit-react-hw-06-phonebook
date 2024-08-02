import React, { useState, useEffect } from 'react';
import { Form } from './form/form';
import Input from './input/input';
import ContactList from './contact-list/contact-list';
import css from './App.module.css';
import JsLocalStorage from './JsLocalStorage';
import selectors from './redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from './redux/filterSlice';
import { deleteContact, replaceContacts } from './redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getContacts);
  const filter = useSelector(selectors.getFilter);

  const [firstRun, setFirstRun] = useState(true);

  const filterHandler = e => {
    const { name, value } = e.target;
    if (name === 'filter') {
      dispatch(setFilter(value));
    }
  };

  const filterContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  useEffect(
    (key = 'contacts') => {
      if (
        JSON.stringify(JsLocalStorage.load(key)) !== JSON.stringify(contacts)
      ) {
        if (localStorage.getItem(key) === null) {
          console.log('no key')
          JsLocalStorage.save(key, contacts);
          setFirstRun(false);
        } else if (localStorage.getItem(key) !== null && firstRun === true) {
          console.log('update initial state from local storage');
          const lsState = JsLocalStorage.load(key);
          dispatch(replaceContacts(lsState));
          setFirstRun(false);
        } else {
          JsLocalStorage.save(key, contacts);
        }
      } else if (firstRun === true) {
        setFirstRun(false);
      } else {
      }
    },
    [contacts, firstRun, dispatch],
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Input
        label="Find contacts by name"
        type="text"
        dataName="filter"
        validation="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Search is not case sensitive"
        funcChange={filterHandler}
        stateField={filter}
      />
      <ContactList arr={filterContacts()} btnHandler={removeContact} />
    </div>
  );
};

export default App;
