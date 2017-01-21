import React, {Component} from 'react';
import { Link } from 'react-router';

class PatientListItem extends Component{
  render(){
    return(
      <div>
      <Link to={"edit/" + this.props.patient.id}>
        {this.props.patient.first_name}
      </Link>
      </div>
    );
  }
}

export default PatientListItem;
