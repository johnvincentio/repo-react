
import React from 'react';

import TestRenderer from 'react-test-renderer';

import List from '../src/components/list';

/* global jest, describe, it, expect */

describe('List component', () => {
  it('renders a snapshot', () => {
    const state = { value: '', cards: ['aaa', 'bbb'] };
    const tree = TestRenderer.create(
      <List
        title="Current Cards"
        cards={state.cards}
        onAddInputChanged={jest.fn()}
        onAddSubmit={jest.fn()}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.only('Renders the List', () => {
    const title = 'Current Cards';
    const state = { value: '', cards: ['aaa', 'bbb'] };
    const testRenderer = TestRenderer.create(
      <List
        title={title}
        cards={state.cards}
        onAddInputChanged={jest.fn()}
        onAddSubmit={jest.fn()}
      />);

    const result = testRenderer.toJSON();
    expect(result.type).toBe('div');
    expect(result.children.length).toBe(3);

    const c1 = result.children[0];
    expect(c1.type).toBe('h3');
    expect(c1.children.length).toBe(1);
    expect(c1.children[0]).toBe(title);

    const c2 = result.children[1];
    expect(c2.type).toBe('div');
    expect(c2.props.className).toBe('card-list');
    expect(c2.children.length).toBe(2);

    c2.children.forEach((item, idx) => {
      expect(item.type).toBe('div');
      expect(item.children.length).toBe(1);

      const inner = item.children[0];
      expect(inner.type).toBe('div');
      expect(inner.children.length).toBe(1);
      expect(inner.children[0]).toBe(state.cards[idx]);
    });

    const c3 = result.children[2];
    expect(c3.type).toBe('form');
    expect(c3.props.id).toBe('js--submit');
    expect(c3.children.length).toBe(3);
    expect(c3.children[0].type).toBe('div');
    expect(c3.children[1].type).toBe('div');
    expect(c3.children[2].type).toBe('button');
  });
});
