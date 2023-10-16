import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navigation/Navbar';
import { AppRoutes } from './Routes';


// const App = () => {
//   return (
//       <div>
//         <Navbar />
//         <AppRoutes />
//       </div>
//   )
// };


class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      return (
        <div>
          <Navbar />
          <AppRoutes />
        </div>
      );
    }
  }

export default App;
