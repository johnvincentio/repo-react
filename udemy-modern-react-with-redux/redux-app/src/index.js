
import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './components/gallery';

const data = [
  { id: 0, url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/react.ico', description: 'React' },
  { id: 1, url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/babel.ico', description: 'Babel' },
  { id: 2, url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/webpack.ico', description: 'Webpack' },
];
// const message = require('./message');
// document.write(message.sayHello());

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Gallery images={data} />,
    document.getElementById('root'),
  ),
);
