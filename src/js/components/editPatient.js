import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import {hashHistory} from 'react-router';

class EditPatient extends Component{
  constructor(props){
      super(props);

      this.state = {
          id: null,
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          street_address: '',
          state: '',
          drug: ''
      };
      this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    patientStore.addChangeListener(this._onChange);
    patientActions.getPatient(this.props.params.id);
  }

  componentWillUnmount(){
    patientStore.removeChangeListener(this._onChange);
  }

  _onChange(){
      this.setState({
        id: patientStore.getSelectedPatient().id || '',
        first_name: patientStore.getSelectedPatient().first_name || '',
        last_name: patientStore.getSelectedPatient().last_name || '',
        email: patientStore.getSelectedPatient().email || '',
        gender: patientStore.getSelectedPatient().gender || '',
        street_address: patientStore.getSelectedPatient().street_address || '',
        state: patientStore.getSelectedPatient().state || '',
        drug: patientStore.getSelectedPatient().drug || ''
      });
  }

  _updatePatient(event){
    event.preventDefault();
    let updatePatient = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      gender: this.state.gender,
      street_address: this.state.street_address,
      state: this.state.state,
      drug: this.state.drug
    }

    patientActions.updatePatient(updatePatient);
    hashHistory.push('/');
  }

  _handleInputChange(field, event){
      let change = {};
      change[field] = event.target.value
      this.setState(change)
  }

  _removePatient(event){
    if(!this.state.id){
      return;
    }
    patientActions.removePatient(this.state.id);
    patientStore.removePatient(this.state.id);
    hashHistory.push('/');
  }

  render(){
    return(
      <div>
        <div>Edit Patient</div><br/>
        <form onSubmit={this._updatePatient.bind(this)}>
          <label>First Name</label><br/>
          <input type={'text'} name={'first_name'} value={this.state.first_name} placeholder={'First Name'} onChange={this._handleInputChange.bind(this, 'first_name')}/><br/>

          <label>Last Name</label><br/>
          <input type={'text'} name={'last_name'} value={this.state.last_name} placeholder={'Last Name'} onChange={this._handleInputChange.bind(this, 'last_name')}/><br/>

          <label>Email Address</label><br/>
          <input type={'text'} name={'email'} value={this.state.email} placeholder={'Email Address'} onChange={this._handleInputChange.bind(this, 'email')}/><br/>

          <label>Gender</label><br/>
          <input type={'text'} name={'gender'} value={this.state.gender} placeholder={'gender'} onChange={this._handleInputChange.bind(this, 'gender')}/><br/>

          <label>Street Address</label><br/>
          <input type={'text'} name={'street_address'} value={this.state.street_address} placeholder={'street_address'} onChange={this._handleInputChange.bind(this, 'street_address')}/><br/>

          <label>State</label><br/>
          <input type={'text'} name={'state'} value={this.state.state} placeholder={'state'} onChange={this._handleInputChange.bind(this, 'state')}/><br/>

          <label>Drug</label><br/>
          <input type={'drug'} name={'drug'} value={this.state.drug} placeholder={'drug'} onChange={this._handleInputChange.bind(this, 'drug')}/><br/>
          <button type='submit'>Update</button>
          <button type='button' onClick={this._removePatient.bind(this)}>Delete</button>
        </form>
      </div>
    )
  }
}

export default EditPatient;
