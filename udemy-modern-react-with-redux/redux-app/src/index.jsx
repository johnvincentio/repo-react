
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Gallery images={data} />,
    document.getElementById('root'),
  ),
);
