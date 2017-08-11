//*****************************************
//Copied from okta react tutorial: https://developer.okta.com/code/javascript/okta_react.html#overview
//*****************************************
import React from 'react';
import { Route, Redirect } from 'react-router';
import { withAuth } from './Auth.js';

export default withAuth(({ auth, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
));


