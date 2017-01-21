import AppDispatcher from '../dispatcher/AppDispatcher';
import patientConstants from '../constants/patientConstants';
import patientApi from '../api/patientApi'

const patientActions = {
  getPatients(){
    patientApi
      .getPatients()
      .then(function (patients){
        AppDispatcher.handleAction({
          actionType: patientConstants.GET_PATIENTS,
          patients: patients.body
        });
      });
  },
  getPatient(id){
    patientApi
      .getPatients(id)
      .then(function (patient){
        AppDispatcher.handleAction({
          actionType: patientConstants.GET_PATIENT,
          patient: patient.body
        });
      });
  },
  postPatient(model){
    patientApi
      .postPatient(model)
      .then(function (){
        AppDispatcher.handleAction({
          actionType: patientConstants.POST_PATIENT,
        });
      });
  },
  removePatient(id){
    patientApi
      .removePatient(id)
      .then(function(){
        AppDispatcher.handleAction({
          actionType: patientConstants.REMOVE_PATIENT,
        });
      });
  }
};

export default patientActions;
