
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
  it('Renders the Gallery and description', function() {
    const renderer = TestRenderer.create(
      <Gallery images={data} />,
		);
    const result = renderer.toJSON();

    expect(result.props.className).toBe('gallery');
    expect(result.children.length).toBe(3);

    result.children.forEach((item, idx) => {
      expect(item.type).toBe('div');
      expect(item.props.className).toBe('gallery-image');
      expect(item.children.length).toBe(2);

      const div0 = item.children[0];
      expect(div0.type).toBe('img');
      expect(div0.props.src).toBe(data[idx].url);
      expect(div0.props.alt).toBe(data[idx].description);

      const div1 = item.children[1];
      expect(div1.type).toBe('p');
      expect(div1.children.length).toBe(1);
      expect(div1.children[0]).toBe(data[idx].description);
    });
  });
});

