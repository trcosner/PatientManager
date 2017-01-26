import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';
import PatientListItem from './patientListItem';
import Infinite from 'react-infinite';
import { Link } from 'react-router';

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
    let listItems = this.state.patients.map(function(patient, index) {
      return (
        <PatientListItem key={index.toString()} patient={patient} index={index}/>
      );
    });
    this.setState({patientList: listItems})
  }

  _scroll(){
    if(this.refs.patientList){
      this.setState({isInfiniteLoading: true});
      setTimeout(function() {
        let nextPage = this.state.page + 1;
        this.setState({page: nextPage});
        patientActions.getPatients(this.state.page);
        this.setState({isInfiniteLoading: false})
      }.bind(this),500);
    }
  }

  _elementInfiniteLoad() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    }

  render(){
    return (
      <div className="patient-list-container" ref="patientList">
        <Link className="link" to="new/">+ New Patient</Link>
        <Infinite className="patient-list"
          elementHeight={20}
          containerHeight={500}
          infiniteLoadBeginEdgeOffset={40}
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
