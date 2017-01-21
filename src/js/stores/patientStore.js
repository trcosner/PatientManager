import AppDispatcher from '../dispatcher/AppDispatcher';
import patientConstants from '../constants/patientConstants';
import objectAssign from 'object-assign';
import patientApi from '../api/patientApi';
import patientActions from '../actions/patientActions';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var _store = {
  patients: []
}

function setPatients(patients){
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
    return _store.patients;
  },
  getPatient(id){
    let index = _store.patients.map(function(patient){return patient.id}).indexOf(id);
    return index > -1 ? _store.patients[index] : [];
  }
});

AppDispatcher.register(function(payload){
  const action = payload.action;

  switch(action.actionType){

    case patientConstants.GET_PATIENTS:
      setPatients(action.patients);
      patientStore.emit(CHANGE_EVENT);
      break

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
