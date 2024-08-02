import React, { useState } from 'react';
import css from './Form.module.css';
import Input from 'components/input/input';
import Button from 'components/button/button';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'components/redux/selectors';
import { addContact } from 'components/redux/contactsSlice';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submitForm = () => {
    if (contacts.filter(contact => contact.name === name).length !== 1) {
      dispatch(addContact(name, number));
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const changeHandler = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submitForm();
        formReset();
      }}
      className={css.form}
    >
      <Input
        label="Name"
        type="text"
        dataName="name"
        validation="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        funcChange={changeHandler}
        stateField={name}
      />
      <Input
        label="Number"
        type="tel"
        dataName="number"
        validation="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        funcChange={changeHandler}
        stateField={number}
      />
      <Button label="Add contact" typeOfBtn="submit" />
    </form>
  );
};

export default Form;
