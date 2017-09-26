
import React from 'react';
import CONTACTS from '../contacts';
import ContactList from './contact-list';

export default function ContactListContainer() {
  return (
    <ContactList contacts={CONTACTS} />
  );
}
