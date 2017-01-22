import AppDispatcher from '../dispatcher/AppDispatcher';
import patientConstants from '../constants/patientConstants';
import objectAssign from 'object-assign';
import patientApi from '../api/patientApi';
import patientActions from '../actions/patientActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var _store = {
  patients: [],
  selectedPatient: {}
}

function setPatients(patients){
  _store.patients = _store.patients.concat(patients);
}

function setSelectedPatient(patient){
  _store.selectedPatient = patient;
}

const patientStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getPatients(){
    return _store.patients;
  },
  getSelectedPatient(){
    return  _store.selectedPatient;
  }
});

AppDispatcher.register(function(payload){
  const action = payload.action;

  switch(action.actionType){

    case patientConstants.GET_PATIENTS:
      setPatients(action.patients);
      patientStore.emit(CHANGE_EVENT);
      break

    case patientConstants.GET_PATIENT:
      setSelectedPatient(action.patient);
      patientStore.emit(CHANGE_EVENT);
      break;

    case patientConstants.POST_PATIENT:
      patientActions.getPatients();
      break;

    case patientConstants.REMOVE_PATIENT:
      patientActions.getPatients();
      break;

    default:
      return true;
  }
});

export default patientStore;
