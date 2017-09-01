
// js/components/board.js
import React from 'react';
// import List from './list';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    // const list = [];
    // for (let i=0; i<3; i++) {
    //     list.push(<List />);
    // }
    render() {
        this.props.titles.forEach(item => {
            console.log("item");
        });
        const jv = this.props.titles.map((item, idx) => {
            return <li key={idx}>Board title: {item}</li>
        });
        console.log("jv "+jv);
        return (
            <div>
            <h2>Board main title: {this.props.title}</h2>
            <ul className="each board">
                {jv}
            </ul>
            </div>
        );
    }
}

/*
stateless

export default function Board() {
    const list = [];
    for (let i=0; i<3; i++) {
        list.push(<List />);
    }

    return (
        <div className="list">
            {list}
        </div>
    );


//                 return <li>Board title: {item}</li>;
            // <div className="list">
            //     {list}
            // </div>

// const card = [];
// for (let i=0; i<3; i++) {
//     card.push(<Card />);
// }

/*
{this.props.titles.forEach(item => 
    <p>Board title: {item}</p>
)}
*/
