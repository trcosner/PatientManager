import AppDispatcher from '../dispatcher/AppDispatcher';
import patientConstants from '../constants/patientConstants';
import objectAssign from 'object-assign';
import patientApi from '../api/patientApi';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var _store = {
  patients: []
}

function setPatients(patients){
  console.log( _store.patients);
  _store.patients = patients;
}

const patientStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getPatients(){
    console.log(_store.patients);
    return _store.patients;
  },
  getPatient(id){
    let index = _store.patients.map(function(patient){return patient.Id;}).indexOf(id);
    return _store.patients[index];
  }
});

AppDispatcher.register(function(payload){
  const action = payload.action;

  switch(action.actionType){

    case patientConstants.GET_PATIENTS:
      setPatients();
      patientStore.emit(CHANGE_EVENT);
      break

    case patientConstants.GET_PATIENT:
      getPatient(action.data);
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
