import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableData extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	
	static PropTypes = {
		id: PropTypes.string.isRequired,
		editable: PropTypes.bool,
		onChange: PropTypes.func,
		className: PropTypes.string
	};

	static defaultProps = {
		editable: false,
		onChange: undefined,
		className: ""
	};

	handleChange(e){
		if(this.props.onChange !== undefined){
			const id = e.target.getAttribute('id');
			const data = e.target.value;
			this.props.onChange(id, data);	
		}
	}

	render(){
		const editableVal = this.props.editable ? "true" : "false";
		return (
			<td {... {"content-editable": editableVal}} className={this.props.className} onChange={this.handleChange} id={this.props.id}>
				{this.props.children}
			</td>
		);
	}
}

