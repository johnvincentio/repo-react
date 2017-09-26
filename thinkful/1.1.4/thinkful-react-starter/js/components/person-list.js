
// js/components/person-list.js
import React from 'react';
import Person from './person';

export default function PersonList() {
  return (
      <div className="person-list">
          <Person name="Derek Zoolander"
                  imageUrl="https://scontent.cdninstagram.com/t51.2885-19/11377856_626372960798542_1396263462_a.jpg"
                  job="Male model" />
          <Person name="Donald Knuth"
                  imageUrl="http://www-cs-faculty.stanford.edu/~uno/don.gif"
                  job="Clever chap" />
      </div>
  );
}
