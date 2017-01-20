import React, {Component} from 'react';
import patientStore from '../stores/patientStore';
import patientActions from '../actions/patientActions';

class App extends Component{

  componentDidMount(){
    patientActions.getPatients();
  }

  render(){
    return(
      <div>
        Hello World
      </div>
    )
  }
}

export default App;
