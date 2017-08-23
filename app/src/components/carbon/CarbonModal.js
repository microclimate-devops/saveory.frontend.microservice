import React, { Component } from 'react';
import PropTypes from 'prop-types';

/********************************************/
//Expects three children: header, content, and footer
/********************************************/
class CarbonModal extends Component{
	static PropTypes = {
		id: PropTypes.string.isRequired
	};

	componentDidMount(){
		//Set custom attributes
		this.refs.modal.setAttribute("data-modal", "true");
		this.refs.modal.setAttribute("tab-index", "-1");
	}

	render(){
		return (
			<div ref="modal" id={this.props.id} className="bx--modal carbon-modal-container">
			  <div className="bx--modal-container">
			    <div className="bx--modal-header">
				{this.props.children[0]}
			    </div>

			    <div className="bx--modal-content">
				{this.props.children[1]}
			    </div>

			    <div className="bx--modal-footer">
				{this.props.children[2]}
			    </div>
			  </div>
			</div>
		);
	}
}

export default CarbonModal;
