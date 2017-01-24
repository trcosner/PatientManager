import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import { Link } from 'react-router';

class PatientListItem extends Component{
  render(){
    return(
      <div>
      <Link to={"edit/" + this.props.patient.id}>
        <span>{this.props.patient.first_name}</span>
      </Link>
      </div>
    );
  }
}

export default PatientListItem;
