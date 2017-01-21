import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import PatientList from './patientList'
import { Link } from 'react-router';

class App extends Component{

  constructor(props){
      super(props);

      this.state = {
        patients: []
      };
      this._onChange = this._onChange.bind(this);
      this._addPatient = this._addPatient.bind(this);
  }

  componentDidMount(){
    patientStore.addChangeListener(this._onChange);
    patientActions.getPatients();
  }

  componentWillUnmount(){
    patientStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState({patients: patientStore.getPatients()});
  }

  _addPatient(){
    let patient = JSON.parse(JSON.stringify(this._getPatientById(5)));
    delete patient.id;
    patientActions.postPatient(patient);
  }

  _removePatient(id){
    patientActions.removePatient(id);
  }

  render(){
    return(
      <div>
        <Link to="new/">+ New Patient</Link>
        <PatientList patients={this.state.patients} />
      </div>
    )
  }
}

export default App;
