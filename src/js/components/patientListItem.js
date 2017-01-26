import React, {Component} from 'react';
import { Link } from 'react-router';

class PatientListItem extends Component{
  render(){
    const styles = {
      altBg: {
        backgroundColor: this.props.index % 2 ? '#eeeeee': 'ffffff'
      }
    }

    return(
      <div className="patient-list-item" style={styles.altBg}>
      <Link className="link" to={"edit/" + this.props.patient.id}>
        <span className="col col-sm">{this.props.patient.id}</span>
        <span className="col col-md">{this.props.patient.first_name}</span>
        <span className="col col-md">{this.props.patient.last_name}</span>
        <span className="col col-md">{this.props.patient.gender}</span>
        <span className="col col-lg">{this.props.patient.email}</span>
      </Link>
      </div>
    );
  }
}

export default PatientListItem;
