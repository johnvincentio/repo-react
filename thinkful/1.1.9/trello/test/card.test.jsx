
import React from 'react';

import TestRenderer from 'react-test-renderer';

import Card from '../src/components/card';

/* global describe, it, expect */

describe('Card component', () => {
  it('renders a snapshot', () => {
    const text = 'Example text';
    const tree = TestRenderer.create(<Card text={text} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders the card', () => {
    const text = 'Example text';
    const testRenderer = TestRenderer.create(
      <Card text={text} />,
    );

    const result = testRenderer.toJSON();
    // console.log('>>> result');
    // console.log(result);
    // console.log('<<< result');

    expect(result.type).toBe('div');
    expect(result.children.length).toBe(1);
    expect(result.children[0]).toBe(text);
  });
});
