import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonButtonPrimary extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	static PropTypes = {
		buttonText: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		isInForm: PropTypes.bool.isRequired,
		addedClass: PropTypes.string
	};

	static defaultProps = {
		addedClass: ""
	};

	handleClick(){
		this.props.onClick();
	}

	handleInForm(){
		let buttonEle = <button className={"bx--btn bx--btn--primary carbon-form-submit-container-button "+this.props.addedClass} onClick={this.handleClick}>{this.props.buttonText}</button>;
	
		//wrap in div if it's in a form
		if(this.props.isInForm){
			buttonEle = <div className="bx--form-item carbon-form-submit-container">{buttonEle}</div>;
		}

		return buttonEle;
	}

	render(){
		return this.handleInForm();
	}
}

export default CarbonButtonPrimary;
