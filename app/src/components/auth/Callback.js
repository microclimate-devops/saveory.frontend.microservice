//*****************************************
//Copied from okta react tutorial: https://developer.okta.com/code/javascript/okta_react.html#overview
//*****************************************
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from './Auth.js';

export default withAuth(class Callback extends Component {
  state = {
    parsingTokens: false
  }

  componentWillMount() {
    if (window.location.hash) {
      this.setState({
        parsingTokens: true
      });
      
      this.props.auth.handleAuthentication()
      .then(() => {
        this.setState({
          parsingTokens: false
        });
      })
      .catch(err => {
        console.log('error logging in', err);
      });
    }
  }

  render() {
    if (!this.state.parsingTokens) {
      const pathname = localStorage.getItem('referrerPath') || '/';
      console.log("pathname: "+pathname);
      return (
        <Redirect to={pathname}/>
      )
    }

    return null;
  }
});
