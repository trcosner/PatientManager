import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions'

import { browserHistory } from 'react-router';

class EditPatient extends Component{
  constructor(props){
      super(props);

      this.state = {
        patient: {}
      };
      this._onChange = this._onChange.bind(this);
      this._updatePatient = this._updatePatient.bind(this);
  }

  componentDidMount(){
    patientStore.addChangeListener(this._onChange);
    patientActions.getPatient(this.props.params.id);
  }

  componentWillUnmount(){
    patientStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState({patient: patientStore.getSelectedPatient()});
  }

  _updatePatient(){
    patientActions.postPatient(this.state.patient);
  }


  render(){
    return(
      <div>
        <div>Edit Patient</div>
        {this.state.patient.last_name}, {this.state.patient.first_name}
      </div>
    )
  }
}

export default EditPatient;
