import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class CarbonDataTableBodyRow extends Component{
	componentDidMount(){
		//set custom attributes
		this.refs.bodyrow.setAttribute("tabindex", "0");
		this.refs.bodyrow.setAttribute("data-parent-row", "true");
	}

	render(){
		return (
			<tr ref="bodyrow" className="bx--table-row bx--parent-row">
				{this.props.children}
			</tr>
		);
	}
}

export default CarbonDataTableBodyRow;

