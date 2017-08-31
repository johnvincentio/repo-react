
// js/components/person-list.js
import React from 'react';
import Person from './person';

// stateful

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
