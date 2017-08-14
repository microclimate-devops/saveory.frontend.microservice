import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthHome extends Component{
 	static PropTypes = {
		isAuth: PropTypes.bool.isRequired,
		user: PropTypes.string.isRequired
	};

	render(){
		if(this.props.isAuth){
			return <Home userToken={1} user={this.props.user}/>
		}
	}
}

export default AuthHome;
