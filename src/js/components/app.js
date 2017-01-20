import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';

class App extends Component{

  constructor(props){
      super(props);

      this.state = {
        patients: [],
        selectedPatient: undefined
      };
      this._onChange = this._onChange.bind(this);
      this._addPatient = this._onChange.bind(this);
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
    this.setState({selectedPatient: patientStore.getSelectedPatient()});
    console.log(this.state.selectedPatient);
  }

  _getPatientById(id){
    patientActions.getPatient(id);
  }

  _addPatient(){
    var newPatient = JSON.parse(Json.stringify(this.state.selectedPatient));
    delete newPatient.
    patientActions.addPatient();
  }

  _addPatient

  render(){
    return(
      <div>
        <div onClick={() => {this._getPatientById(5)}}>
          Get Patient #5
        </div>
        <div onClick={() => {this._addPatient()}}>
          Add Patient
        </div>
      </div>

    )
  }
}

export default App;
