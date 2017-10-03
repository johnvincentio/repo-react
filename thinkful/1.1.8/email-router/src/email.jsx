
import React from 'react';

export default function Email(props) {
  console.log('--- Email');
  return (
    <div>
      <h1>Single Email</h1>
      <div>{props.id}</div>
      <div>{props.from}</div>
      <div>{props.to}</div>
      <div>{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
}
