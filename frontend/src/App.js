import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoteList from './NoteList';
import NoteEdit from "./NoteEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/notes' exact={true} component={NoteList}/>
            <Route path='/notes/:id' component={NoteEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;