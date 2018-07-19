import React from 'react';

import CONTACTS from '../contacts';
import Contact from './contact';

export default function ContactContainer(props) {
  const contact = CONTACTS[props.params.contactId];
  return <Contact id={contact.id} name={contact.name}
                    phoneNumber={contact.phoneNumber} />;
}
