
import React from 'react';

import TestRenderer from 'react-test-renderer';

import Gallery from '../src/components/gallery';

const data = [
  { id: 0, url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/react.ico', description: 'React' },
  { id: 1, url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/babel.ico', description: 'Babel' },
  { id: 2, url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/webpack.ico', description: 'Webpack' },
];

/* eslint-env node, mocha */

describe('Gallery component', function() {
  it.only('Renders the Gallery and description', function() {
    const renderer = TestRenderer.create(
      <Gallery images={data} />,
		);
    const result = renderer.toJSON();
    result.props.className.should.equal('gallery');
    result.children.length.should.equal(3);

    result.children.forEach((item, idx) => {
      item.type.should.equal('div');
      item.props.className.should.equal('gallery-image');
      item.children.length.should.equal(2);

      const div0 = item.children[0];
      div0.type.should.equal('img');
      div0.props.src.should.equal(data[idx].url);
      div0.props.alt.should.equal(data[idx].description);

      const div1 = item.children[1];
      div1.type.should.equal('p');
      div1.children.length.should.equal(1);
      div1.children[0].should.equal(data[idx].description);
    });
  });
});
