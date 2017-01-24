import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import EditPatient from './components/editPatient';
import NewPatient from './components/newPatient';
import { Router, Route, hashHistory } from 'react-router'


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="edit/:id" component={EditPatient}/>
    <Route path="new/" component={NewPatient}/>
  </Router>
), document.getElementById('root'))
