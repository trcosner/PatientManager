import React from 'react';
import ReactDOM from 'react-dom';
import PatientList from './components/patientList';
import EditPatient from './components/editPatient';
import NewPatient from './components/newPatient';
import { Router, Route, hashHistory } from 'react-router';
import '../less/app.less';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={PatientList}/>
    <Route path="edit/:id" component={EditPatient}/>
    <Route path="new/" component={NewPatient}/>
  </Router>
), document.getElementById('root'))
