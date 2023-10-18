import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './Routes';
import { withCookies } from 'react-cookie';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
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
          <AppRoutes />
        </div>
      );
    }
  }

export default withCookies(App);
