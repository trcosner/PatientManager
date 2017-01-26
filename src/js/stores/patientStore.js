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
  let existing =_store.patients.filter(function(patient){
    return patients.map(function(ele){return ele.id;}).indexOf(patient.id) === -1;
  })
  _store.patients = existing.concat(patients).sort(function(a,b){
    return a.id - b.id;
  });
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
  },
  updatePatient(patient){
    let index = _store.patients.map(function(patient){return patient.id;}).indexOf(patient.id);
    if(index === -1){return;}
    _store.patients.splice(index, 1, patient);
  },
  removePatient(id){
    let index = _store.patients.map(function(patient){return patient.id;}).indexOf(id);
    _store.patients = _store.patients.splice(index, 1);
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

    case patientConstants.UPDATE_PATIENT:
      setSelectedPatient('');
      patientStore.updatePatient(action.patient.body);
      patientStore.emit(CHANGE_EVENT);
      break;

    case patientConstants.REMOVE_PATIENT:
      patientStore.removePatient(action.id)
      patientStore.emit(CHANGE_EVENT)
      break;

    case patientConstants.ADD_PATIENT:
      patientActions.getPatients();
      patientStore.emit(CHANGE_EVENT)
      break

    default:
      return true;
  }
});

export default patientStore;
