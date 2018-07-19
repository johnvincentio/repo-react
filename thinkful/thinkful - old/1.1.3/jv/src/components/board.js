
import React from 'react';
import List from './list';

export default function Board() {
  const lists = [];
  for (let i = 0; i < 3; i++) {
    lists.push(<List />);
  }
  return (
    <div className="list">
      {lists}
    </div>
  );
}
