import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import PatientList from './patientList'
import { Link } from 'react-router';

class App extends Component{

  render(){
    return(
      <div>
        <Link to="new/"><span className="box">+ New Patient</span></Link>
        <PatientList/>
      </div>
    )
  }
}

export default App;
