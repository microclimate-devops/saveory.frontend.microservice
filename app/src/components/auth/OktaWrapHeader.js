//*****************************************
//Inspired from okta react tutorial: https://developer.okta.com/code/javascript/okta_react.html#overview
//*****************************************
import React from 'react';
import { withRouter } from 'react-router';
import { withAuth } from './Auth.js';
import Header from '../Header.js';

export default withAuth(withRouter(props => {
  // Change the button that's displayed, based on our authentication status
  const isAuthenticated = props.auth.isAuthenticated();

  return (
    <div>
	<Header isAuth={isAuthenticated} logoutHandler={props.auth.logout.bind(null, props.history)} loginHandler={props.auth.login.bind(null, props.history)}/>
    </div>
  );
}));
