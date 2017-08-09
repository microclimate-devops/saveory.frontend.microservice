import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pantry from './components/Pantry.js';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {username: "", pantry: []};
	}

	static propTypes = {
		userToken: PropTypes.number.isRequired,
		user: PropTypes.string.isRequired
	};

	render(){
		return (
			<div className="content-wrap">
				<Pantry user={this.props.user}}/>
			</div>
		);
	}
}

export default Home;
