import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfoMessage extends Component{
	static PropTypes = {
		msg: PropTypes.string.isRequired,
		showMsg: PropTypes.bool.isRequired,
		msgIsError: PropTypes.bool.isRequired
	};

	determineMessageClassName(){
		const classname = this.props.msgIsError ? 'error-msg' : 'success-msg';
		return classname;
	}

	render(){
		return(
			<div className="info-message-container">
				{this.props.showMsg && <p className={this.determineMessageClassName()}>{this.props.msg}</p>}
			</div>
		);
	}
}

export default InfoMessage;
