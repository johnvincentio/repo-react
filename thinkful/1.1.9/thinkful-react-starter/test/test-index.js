
import React from 'react';
import TestUtils from 'react-dom/test-utils';

import chai from 'chai';

import Image from '../js/components/image';

const should = chai.should();

describe('Image component', function() {
  it('Renders the image and description',  function() {
    const url = 'http://www.example.com/image.png';
    const description = 'Example description';

    const renderer = TestUtils.createRenderer();
    renderer.render(<Image url={url} description={description} />);
    const result = renderer.getRenderOutput();
    result.props.className.should.equal('gallery-image');

    const img = result.props.children[0];
    img.type.should.equal('img');
    img.props.src.should.equal(url);
    img.props.alt.should.equal(description);

    const p = result.props.children[1];
    p.type.should.equal('p');
    p.props.children.should.equal(description);
  });
});
