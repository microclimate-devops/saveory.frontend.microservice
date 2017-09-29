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
			this.props.onChange(e.target);	
		}
	}

	showData(){
		let content = this.props.children;

		//Change to input if it's currently editable
		if(this.props.editable){
			content = <input id={this.props.id} type="text" value={content} onChange={this.handleChange} className="pantry-table-editing-cell"/>
		}

		return content;
	}

	render(){
		return (
			<td ref="data" className={this.props.className}>
				{this.showData()}
			</td>
		);
	}
}

export default TableData;

