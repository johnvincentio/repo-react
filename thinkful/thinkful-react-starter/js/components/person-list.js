
// js/components/person-list.js
import React from 'react';
import Person from './person';

// stateful
/*
export default class PersonList extends React.Component {
    render() {
        const people = [];
        for (let i=0; i<5; i++) {
            people.push(<Person />);
        }
        return (
            <div className="person-list">
                {people}
            </div>
        );
    }
}
*/

// stateless

const name = 'Derek Zoolander';
const imageUrl = 'https://scontent.cdninstagram.com/t51.2885-19/11377856_626372960798542_1396263462_a.jpg';
const job = 'Male model';

export default function PersonList() {
    const people = [];
    for (let i=0; i<5; i++) {
        people.push(<Person />);
    }
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

// stateless

/*
export default function PersonList() {
    const people = [];
    for (let i=0; i<5; i++) {
        people.push(<Person />);
    }
    return (
        <div className="person-list">
            {people}
        </div>
    );
}
*/

// export default function PersonList() {
//     return (
//         <div className="person-list">
//             <Person />
//             <Person />
//             <Person />
//             <Person />
//             <Person />
//         </div>
//     );
// }
