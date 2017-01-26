import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import PatientForm from './patientForm';
import {hashHistory} from 'react-router';

class EditPatient extends Component{

  _updatePatient(event){
    event.preventDefault();
    let formData = this.refs.form.state;
    let updatePatient = {
      id: formData.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      gender: formData.gender,
      street_address: formData.street_address,
      state: formData.state,
      drug: formData.drug
    }

    patientActions.updatePatient(updatePatient);
    hashHistory.push('/');
  }

  _removePatient(event){
    if(!this.props.params.id){
      return;
    }
    patientActions.removePatient(this.props.params.id);
    hashHistory.push('/');
  }

  render(){
    const styles = {
        button: {
          backgroundColor: 'Red',
          color: 'white',
          marginBottom: '15px'
        },
        container: {
          margin: '25px'
        }
      }

    return(
      <div style={styles.container}>
        <h3>Edit Patient</h3><br/>
        <button
          type="button"
          style={styles.button}
          onClick={this._removePatient.bind(this)}
        >Delete Patient
        </button>
        <PatientForm
          ref="form"
          buttonAction={this._updatePatient.bind(this)}
          buttonText={'Update'}
          id={this.props.params.id}/>
      </div>
    )
  }
}

export default EditPatient;
