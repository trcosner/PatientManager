import patientActions from '../actions/patientActions'
import request from 'superagent';
import noCache from 'superagent-no-cache'

const patientApi = {
  getPatients(id) {
    if(id){
      return request
        .get('https://izenda.herokuapp.com/patients/' + id)
        .use(noCache)
    }
    return request
      .get('https://izenda.herokuapp.com/patients/')
      .use(noCache)
  },
  postPatient(model){
    //getting 404 on PUT method for adding new patients 
    //so I ran add and edit on POST
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
