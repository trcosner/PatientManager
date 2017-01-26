import React, {Component} from 'react';
import patientActions from '../actions/patientActions';
import PatientForm from './patientForm';
import {hashHistory} from 'react-router';

class NewPatient extends Component{

  _addPatient(event){
    event.preventDefault();
    let formData = this.refs.form.state;
    let newPatient = {
      id: formData.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      gender: formData.gender,
      street_address: formData.street_address,
      state: formData.state,
      drug: formData.drug
    }

    patientActions.addPatient(newPatient);
    hashHistory.push('/');
  }

  render(){
    const styles = {
      container: {
        margin: '25px'
      }
    }
    return(
      <div style={styles.container}>
        <h3>New Patient</h3><br/>
        <PatientForm
          ref="form"
          buttonAction={this._addPatient.bind(this)}
          buttonText={'Add'}
          id={this.props.params.id}/>
      </div>
    )
  }
}

export default NewPatient;
