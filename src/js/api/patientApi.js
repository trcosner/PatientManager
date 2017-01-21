import patientActions from '../actions/patientActions'
import request from 'superagent';
import noCache from 'superagent-no-cache'

const patientApi = {
  getPatients() {
    return request
      .get('https://izenda.herokuapp.com/patients/')
      .use(noCache)
  },
  postPatient(model){
    //not PUT so sharing POST endpoint for add and update
    //if no id then adds
    return request
      .post('https://izenda.herokuapp.com/patients')
      .set('Content-Type', 'application/json')
      .send(model)
  },
  removePatient(id){
    return request
      .delete('https://izenda.herokuapp.com/patients/' + id)
  }
};

export default patientApi;
