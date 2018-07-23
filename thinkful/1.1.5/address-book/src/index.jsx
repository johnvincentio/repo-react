import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook';
import './index.css';

const contacts = [
	{
		name: 'Alice Aardvark',
		photo: 'https://api.adorable.io/avatars/64/alice%40thinkful.com',
		address: '1600 Pennsylvania Ave'
	},
	{
		name: 'Bob Bear',
		photo: 'https://api.adorable.io/avatars/64/bob%40thinkful.com',
		address: '725 5th Ave'
	},
	{
		name: 'Carol Coyote',
		photo: 'https://api.adorable.io/avatars/64/carol%40thinkful.com',
		address: '4 Pennsylvania Plaza'
	}
];
ReactDOM.render(<AddressBook contacts={contacts} />, document.getElementById('root'));
