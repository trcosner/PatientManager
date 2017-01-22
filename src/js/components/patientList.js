import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import PatientListItem from './patientListItem';
import Infinite from 'react-infinite';

class PatientList extends Component {
  constructor(props){
      super(props);

      this.state = {
        patients: [],
        patientList: [],
        page: 1,
        isInfiniteLoading: false
      };
      this._onChange = this._onChange.bind(this);
      this._scroll = this._scroll.bind(this);
      this._addPatient = this._addPatient.bind(this);
  }

  componentDidMount(){
    patientStore.addChangeListener(this._onChange);
    patientActions.getPatients(this.state.page);
  }

  componentWillUnmount(){
    patientStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState({patients: patientStore.getPatients()})
    console.log(this.state.patients);
    let listItems = this.state.patients.map(function(patient, index) {
      return (
        <PatientListItem key={patient.id.toString()} patient={patient} />
      );
    });
    this.setState({patientList: listItems})
  }

  _scroll(){
    console.log('scrolling');
    this.setState({isInfiniteLoading: true});
    setTimeout(function() {
      let nextPage = this.state.page + 1;
      this.setState({page: nextPage});
      patientActions.getPatients(this.state.page);
      this.setState({isInfiniteLoading: false})
    }.bind(this),1000);
  }

  _addPatient(){
    let patient = JSON.parse(JSON.stringify(this._getPatientById(5)));
    delete patient.id;
    patientActions.postPatient(patient);
  }

  _removePatient(id){
    patientActions.removePatient(id);
  }

  _elementInfiniteLoad() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    }

  render(){
    const styles = {
      container: {
        height: '200px',
        overflowY: 'auto'
      }
    }
    return (
      <div style={styles.container}>
        <Infinite
          elementHeight={10}
          containerHeight={200}
          infiniteLoadBeginEdgeOffset={10}
          onInfiniteLoad={this._scroll}
          loadingSpinnerDelegate={this._elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
        >
          {this.state.patientList}
        </Infinite>
      </div>
    );
  }
}

export default PatientList;
