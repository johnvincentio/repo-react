
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

import Home from './home';
import Mailbox from './mailbox';
import EmailContainer from './email-container';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:mailbox_name" component={Mailbox} />
      <Route path="/:mailbox_name/:id" component={EmailContainer} />
    </Switch>
  </main>
);

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/inbox">Inbox</Link></li>
        <li><Link to="/spam">Spam</Link></li>
        <li><Link to="/inbox/0">Inbox 0</Link></li>
        <li><Link to="/spam/0">Spam 0</Link></li>
      </ul>
    </nav>
  </header>
);

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'));
