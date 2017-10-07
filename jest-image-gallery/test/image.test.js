
import React from 'react';

// import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';

import Image from '../src/components/image';

/* global describe, it, expect */

describe('Image component', function() {
  it('Renders the image and description', function() {
    const url = 'http://www.example.com/image.png';
    const description = 'Example description';

    const testRenderer = TestRenderer.create(
      <Image url={url} description={description} />,
    );

    const result = testRenderer.toJSON();

    expect(result.props.className).toBe('gallery-image');

    const img = result.children[0];
    expect(img.type).toBe('img');
    expect(img.props.src).toBe(url);
    expect(img.props.alt).toBe(description);

    const p = result.children[1];
    expect(p.type).toBe('p');
    expect(p.children[0]).toBe(description);
  });
});
