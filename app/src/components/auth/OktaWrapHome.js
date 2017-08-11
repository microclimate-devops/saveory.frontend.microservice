//*****************************************
//Inspired from okta react tutorial: https://developer.okta.com/code/javascript/okta_react.html#overview
//*****************************************
import React from 'react';
import { withRouter } from 'react-router';
import { withAuth } from './Auth.js';
import Home from '../Home.js';

export default withAuth(withRouter(props => {
  // Change the button that's displayed, based on our authentication status
  const returnEle = props.auth.isAuthenticated() ? 
	<Home userToken={1} user="test"/> :
	<h1>Error, user not logged in</h1>;

  

  return (
    <div>
	{returnEle}
    </div>
  );
}));

