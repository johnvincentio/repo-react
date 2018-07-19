
import React from 'react';

export default function Contact(props) {
  return (
    <div>
      <strong>
        {props.name}
      </strong>
            &nbsp;
      {props.phoneNumber}
    </div>
  );
}
