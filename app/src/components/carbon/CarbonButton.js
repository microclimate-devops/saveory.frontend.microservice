import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonButton extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

  	static propTypes = {
		text: PropTypes.string,
		onClick: PropTypes.func,
		target: PropTypes.object,
		isSecondary: PropTypes.bool,
		isGhost: PropTypes.bool,
		isSmall: PropTypes.bool,
		isInForm: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isModalControl: PropTypes.bool,
		modalTarget: PropTypes.string,
		addedClass: PropTypes.string
	};

	static defaultProps = {
		text: undefined,
		onClick: undefined,
		target: undefined,
		isSecondary: false,
		isGhost: false,
		isSmall: false,
		isInForm: false,
		isDisabled: false,
		isModalControl: false,
		modalTarget: "",
		addedClass: ""
	};

	//The button could be either primary or secondary so apply the correct class
	determineHtmlClass(){
		let className = "";

		//determine if ghost
		if(this.props.isGhost){
			className = "bx--btn--ghost";
		}else{
			//determine primary or secondary
			if(this.props.isSecondary){
				className = "bx--btn bx--btn--secondary";
			}else{
				className = "bx--btn bx--btn--primary";
			}
		}

		//determine if small or not
		if(this.props.isSmall){
			className += " bx--btn--sm";
		}

		//Add additonal user specified classes
		className += " "+this.props.addedClass;
		return className;
	}

	handleClick(e){
		if(this.props.onClick){
			//Add props.target as param if specified
			if(this.props.target !== undefined){
				this.props.onClick(this.props.target);
			}else{
				this.props.onClick();
			}
		}
	}

	showButton(){
		const className = this.determineHtmlClass();
		let button = <button ref="button" type="button" onClick={this.handleClick} className={className}>{this.props.text} {this.props.children}</button>

		//Put in form div if it's being rendered in a form
		if(this.props.isInForm){
			button = <div className="bx--form-item carbon-form-submit-container">{button}</div>;
		}

		return button;
	}

	componentDidUpdate(){
		//disable or enable if prop specifies it should be
		if(this.props.isDisabled){
			this.refs.button.setAttribute("disabled", "true");
		}else{
			this.refs.button.removeAttribute("disabled");
		}
	}

	componentDidMount(){
		//Setup modal link if needed
		if(this.props.isModalControl){
			this.refs.button.setAttribute("data-modal-target", this.props.modalTarget);
		}

		//disable if prop specifies it should be
		if(this.props.isDisabled){
			this.refs.button.setAttribute("disabled", "true");
		}
	}

	render(){
		return this.showButton();
	}
}

export  default CarbonButton;
