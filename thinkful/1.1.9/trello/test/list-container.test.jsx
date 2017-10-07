
import React from 'react';

import TestRenderer from 'react-test-renderer';

import ListContainer from '../src/components/list-container';

/* global describe, it, expect */

describe.only('ListContainer component', () => {
  it('renders a snapshot', () => {
    const title = 'title-list';
    const cards = [
        { id: 0, text: `${title}-card1` },
        { id: 1, text: `${title}-card2` },
        { id: 2, text: `${title}-card3` },
    ];
    const tree = TestRenderer.create(<ListContainer title={title} cards={cards} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders the ListContainer', () => {
    const title = 'title-list';
    const cards = [
        { id: 0, text: `${title}-card1` },
        { id: 1, text: `${title}-card2` },
        { id: 2, text: `${title}-card3` },
    ];
    const testRenderer = TestRenderer.create(<ListContainer title={title} cards={cards} />);
    const result = testRenderer.toJSON();
    expect(result.type).toBe('div');
    expect(result.children.length).toBe(3);

    const c1 = result.children[0];
    expect(c1.type).toBe('h3');
    expect(c1.children.length).toBe(1);
    expect(c1.children[0]).toBe('Current Cards');

    const c2 = result.children[1];
    expect(c2.type).toBe('div');
    expect(c2.props.className).toBe('card-list');
    expect(c2.children.length).toBe(2);

    const c3 = result.children[2];
    expect(c3.type).toBe('form');
    expect(c3.props.id).toBe('js--submit');
    expect(c3.children.length).toBe(3);
    expect(c3.children[0].type).toBe('div');
    expect(c3.children[1].type).toBe('div');
    expect(c3.children[2].type).toBe('button');
  });
});
