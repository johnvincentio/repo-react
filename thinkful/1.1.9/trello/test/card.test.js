
import React from 'react';

// import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';

import Card from '../src/components/card';

describe('Card component', function() {
  it('Renders the card',  function() {
    const text = 'Example text';

    const testRenderer = TestRenderer.create(
      <Card text={text} />,
    );

    const result = testRenderer.toJSON();
    console.log(">>> result");
    console.log(result);
    console.log("<<< result");

    expect(result.type).toBe('div');
    expect(result.children.length).toBe(1);
    expect(result.children[0]).toBe(text);
  });
});
