
import React from 'react';
import Contact from './contact';

export default function ContactList(props) {
  const contacts = Object.keys(props.contacts).map((contactId, index) => {
    const contact = props.contacts[contactId];
    return (
      <li key={index}>
        <Contact
          id={contact.id}
          name={contact.name}
          phoneNumber={contact.phoneNumber}
        />
      </li>
    );
  });

  return (
    <ul>
      {contacts}
    </ul>
  );
}
