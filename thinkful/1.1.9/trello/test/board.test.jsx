
import React from 'react';

import TestRenderer from 'react-test-renderer';

import Board from '../src/components/board';

/* global describe, it, expect */

describe('Board component', () => {
  it('renders a snapshot', () => {
    const title = 'title-list';
    const cards = [
        { id: 0, text: `${title}-card1` },
        { id: 1, text: `${title}-card2` },
        { id: 2, text: `${title}-card3` },
    ];
    const tree = TestRenderer.create(<Board title={title} lists={cards} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders the Board', () => {
    const title = 'title-list';
    const cards = [
        { id: 0, text: `${title}-card1` },
        { id: 1, text: `${title}-card2` },
        { id: 2, text: `${title}-card3` },
    ];
    const testRenderer = TestRenderer.create(<Board title={title} lists={cards} />);
    const result = testRenderer.toJSON();
    expect(result.type).toBe('div');
    expect(result.children.length).toBe(2);

    const c1 = result.children[0];
    expect(c1.type).toBe('h1');
    expect(c1.children.length).toBe(1);
    expect(c1.children[0]).toBe(title);

    const c2 = result.children[1];
    expect(c2.type).toBe('div');
    expect(c2.props.className).toBe('list');
    expect(c2.children.length).toBe(3);

    c2.children.forEach((item) => {
      expect(item.type).toBe('div');
      expect(item.children.length).toBe(2);

      expect(item.children[0].type).toBe('h2');

      expect(item.children[1].type).toBe('div');
      expect(item.children[1].children.length).toBe(3);
    });
  });
});
