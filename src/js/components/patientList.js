import React, {Component} from 'react';
import PatientListItem from './patientListItem';
import Infinite from 'react-infinite';

class PatientList extends Component {
  render(){
    var listItems = this.props.patients.map(function(patient, index) {
      return (
        <PatientListItem key={patient.id.toString()} patient={patient} />
      );
    });

    return (
      <Infinite containerHeight={500} elementHeight={20}>
        {listItems}
      </Infinite>
    );
  }
}

export default PatientList;
