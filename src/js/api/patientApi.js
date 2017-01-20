import patientActions from '../actions/patientActions'
import request from 'superagent';

const patientApi = {
  getPatients() {
    return request
      .get('https://izenda.herokuapp.com/patients/')
  },
  getPatient(id) {
    return request
      .get('https://izenda.herokuapp.com/patients/' + id)
  }
};

export default patientApi;
