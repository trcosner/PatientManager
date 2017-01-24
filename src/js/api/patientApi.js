import patientActions from '../actions/patientActions'
import request from 'superagent';
import noCache from 'superagent-no-cache'

const patientApi = {
  getPatients(page) {
    return request
      .get('https://izenda.herokuapp.com/patients/')
      .query({_page: page})
      .query({_limit: 20})
      .use(noCache)
  },
  getPatient(id) {
      return request
        .get('https://izenda.herokuapp.com/patients/' + id)
        .use(noCache)
  },
  updatePatient(model){
    return request
      .put('https://izenda.herokuapp.com/patients/' + model.id)
      .send(model)
  },
  addPatient(model){
    return request
      .post('https://izenda.herokuapp.com/patients/')
      .send(model)
  },
  removePatient(id){
    return request
      .delete('https://izenda.herokuapp.com/patients/' + id)
  }
};

export default patientApi;
