import AppDispatcher from '../dispatcher/AppDispatcher';
import patientConstants from '../constants/patientConstants';
import patientApi from '../api/patientApi'

const patientActions = {
  getPatients(page){
    patientApi
      .getPatients(page)
      .then(function (patients){
        AppDispatcher.handleAction({
          actionType: patientConstants.GET_PATIENTS,
          patients: patients.body
        });
      });
  },
  getPatient(id){
    patientApi
      .getPatient(id)
      .then(function (patient){
        AppDispatcher.handleAction({
          actionType: patientConstants.GET_PATIENT,
          patient: patient.body
        });
      });
  },
  updatePatient(model){
    patientApi
      .updatePatient(model)
      .then(function (patient){
        AppDispatcher.handleAction({
          actionType: patientConstants.UPDATE_PATIENT,
          patient: patient
        });
      });
  },
  addPatient(model){
    patientApi
      .addPatient(model)
      .then(function(){
        AppDispatcher.handleAction({
          actionType: patientConstants.ADD_PATIENT,
          patient: model
        });
      });
  },
  removePatient(id){
    patientApi
      .removePatient(id)
      .then(function(){
        AppDispatcher.handleAction({
          actionType: patientConstants.REMOVE_PATIENT,
          id: id
        });
      });
  }
};

export default patientActions;
