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
      .getPatient(id)
      .then(function (patient){
        AppDispatcher.handleAction({
          actionType: patientConstants.GET_PATIENT,
          patient: patient.body
        });
      });
  },
  addPatient(model){
    AppDispatcher.handlection({
      actionType: patientConstants.ADD_PATIENT
    });
  },
  updatePatient(model){
    AppDispatcher.handleAction({
      actionType: patientConstants.UPDATE_APPOINTMENT,
      data: model
    })
  },
  removePatient(id){
    AppDispatcher.handleAction({
      actionType: patientConstants.REMOVE_PATIENT,
      id: id
    })
  }
};

export default patientActions;
