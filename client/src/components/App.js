import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import StreamList from './Streams/StreamList';
import StreamCreate from './Streams/StreamCreate';
import StreamEdit from './Streams/StreamEdit';
import StreamDelete from './Streams/StreamDelete';
import StreamShow from './Streams/StreamShow';
import history from '../history'

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit/:id" exact component={StreamEdit} />
                <Route path="/streams/delete/:id" exact component={StreamDelete} />
                <Route path="/streams/:id" exact component={StreamShow} />
            </Router>
        </div>
    );
}

export default App;