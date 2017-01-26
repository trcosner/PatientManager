import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';

class PatientForm extends Component{
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
        if(this.props.id){
            patientStore.addChangeListener(this._onChange);
            patientActions.getPatient(this.props.id);
        }
    }

    componentWillUnmount(){
        if(this.props.id){
            patientStore.removeChangeListener(this._onChange);
        }

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

    _handleInputChange(field, event){
        let change = {};
        change[field] = event.target.value
        this.setState(change)
    }

    _toggleGenderChange(gender){
      this.setState({gender: gender});
    }

    render(){
      const styles = {
          button: {
            backgroundColor: 'blue',
            color: 'white'
          }
      }

      return (
          <form onSubmit={this.props.buttonAction}>
              <label>First Name</label><br/>
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                placeholder="First Name"
                onChange={this._handleInputChange.bind(this, 'first_name')}/>
                <br/>
              <label>Last Name</label><br/>
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                placeholder="Last Name"
                onChange={this._handleInputChange.bind(this, 'last_name')}/>
                <br/>
              <label>Email Address</label><br/>
              <input
                type="text"
                name="email"
                value={this.state.email}
                placeholder="Email Address"
                onChange={this._handleInputChange.bind(this, 'email')}/>
                <br/>
              <label>Male</label>
              <input
                type="radio"
                name="male"
                value="male"
                checked={this.state.gender.toLowerCase() === 'male'}
                onChange={this._toggleGenderChange.bind(this, 'male')}/>
              <label>Female</label>
              <input
                type="radio"
                name="female"
                value="female"
                checked={this.state.gender.toLowerCase() === 'female'}
                onChange={this._toggleGenderChange.bind(this, 'female')}/>
                <br/>
              <label>Street Address</label><br/>
              <input
                type="text"
                name="street_address"
                value={this.state.street_address}
                placeholder="street_address"
                onChange={this._handleInputChange.bind(this, 'street_address')}/>
                <br/>
              <label>State</label><br/>
              <input
                type="text"
                name="state"
                value={this.state.state}
                placeholder="state"
                onChange={this._handleInputChange.bind(this, 'state')}/>
                <br/>
              <label>Drug</label><br/>
              <input
                type="drug"
                name="drug"
                value={this.state.drug}
                placeholder="drug"
                onChange={this._handleInputChange.bind(this, 'drug')}/>
                <br/>
              <button type="submit"
                style={styles.button}
                >{this.props.buttonText}
              </button>
          </form>
      );
    }
}

export default PatientForm;
