import AppDispatcher from '../dispatcher/AppDispatcher';
import patientConstants from '../constants/patientConstants';
import objectAssign from 'object-assign';
import patientApi from '../api/patientApi';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var _store = {
  patients: [],
  selectedPatient: undefined
}

function setPatients(patients){
  _store.patients = patients;
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
    return _store.selectedPatient;
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
      break

    case patientConstants.UPDATE_PATIENT:
      updatePatient(action.data);
      patientStore.emit(CHANGE_EVENT);
      break;

    case patientConstants.ADD_PATIENT:
      addPatient(action.data);
      patientStore.emit(CHANGE_EVENT);
      break;

    case patientConstants.REMOVE_PATIENT:
      removePatient(action.data);
      patientStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

export default patientStore;
