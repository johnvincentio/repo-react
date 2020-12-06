import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';
import Board from './board';

import './app.css';

export default function App(props) {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1><Link to="/">Trelloish</Link></h1>
                </header>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/board/:boardId" component={Board} />
                </main>
            </div>
        </Router>
    );
}
