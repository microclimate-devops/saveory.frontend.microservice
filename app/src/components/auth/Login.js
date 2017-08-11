//*****************************************
//Copied from okta react tutorial: https://developer.okta.com/code/javascript/okta_react.html#overview
//*****************************************
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from './Auth';

export default withAuth(class Login extends Component {
  render() {
    let from;
    if (this.props.location && this.props.location.state) {
      from = this.props.location.state.from;
    } else {
      from = { pathname: '/' };
    }
    
    if (this.props.auth.isAuthenticated()) {
      return <Redirect to={from}/>;
    }

    localStorage.setItem('referrerPath', from.pathname);
    this.props.auth.redirect();
    return null;
  }
});
