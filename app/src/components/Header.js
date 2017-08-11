import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';

class Header extends Component{
	render(){
		return (
			<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to Saveory</h2>
			  <Link to="/login">Login</Link>
			</div>
		);
	}
}

export default Header;
