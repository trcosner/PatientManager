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
          patients: patients
        });
      })
    AppDispatcher.handleAction({
      actionType: patientConstants.GET_PATIENTS,
    });
  },
  getPatient(response){
    AppDispatcher.handleAction({
      actionType: patientConstants.GET_PATIENT,
    })
  },
  addPatient(){
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
