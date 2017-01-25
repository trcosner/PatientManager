import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import { Link } from 'react-router';

class PatientListItem extends Component{
  render(){
    const styles = {
      altBg: {
        backgroundColor: this.props.index % 2 ? '#eeeeee': 'ffffff'
      }
    }

    console.log(this.props.index);
    return(
      <div className="patient-list-item" style={styles.altBg}>
      <Link className="link" to={"edit/" + this.props.patient.id}>
        <span>{this.props.patient.first_name}</span>
      </Link>
      </div>
    );
  }
}

export default PatientListItem;
