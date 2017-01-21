import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';

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
    console.log(this.state.patients);
  }

  _getPatientById(id){
    return patientStore.getPatient(id);
  }

  _addPatient(){
    let patient = JSON.parse(JSON.stringify(this._getPatientById(5)));
    delete patient.id;
    patientActions.postPatient(patient);
  }

  _updatePatient(){
    let patient = JSON.parse(JSON.stringify(this._getPatientById(1012)));
    patient.first_name = 'Tyler'
    patientActions.postPatient(patient);
  }

  _removePatient(id){
    patientActions.removePatient(id);
  }

  render(){
    return(
      <div>
        <div onClick={() => {this._getPatientById(5)}}>
          Get Patient #5
        </div>
        <div onClick={() => {this._addPatient()}}>
          Add Patient
        </div>
        <div onClick={() => {this._updatePatient()}}>
          Update Patient
        </div>
        <div onClick={() => {this._removePatient(1011)}}>
          Remove Patient
        </div>
      </div>

    )
  }
}

export default App;
