import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableData, Icon} from 'carbon-components-react'; 

class PantryTableIngredient extends Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	static PropTypes = {
		dataAccessors: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		onDelete: PropTypes.func.isRequired,
		isEven: PropTypes.bool.isRequired
	};


	handleDelete(e){
		this.props.onDelete(this.props.data);
	}

	showRow(){
		let row = [];
		let selector = "";
		
		//Add expander
		//row.push(<TableData key="expander" expanded={this.props.isExpanded === undefined ? false : this.props.isExpanded} onClick={this.handleExpander}></TableData>);
		row.push(<TableData key="expander"/>);
		//use the data accesssors prop to create the row with data in the correct order
		for(var accessor of this.props.dataAccessors){
			selector = accessor.selector;
			row.push(<TableData key={selector} className="pantry-table-ingredient">{this.props.data[selector]}</TableData>);
		}

		//Add row actions
		row.push(<TableData key="actions" className="pantry-table-row-actions"><Icon className="delete-ingredient-icon" name="delete" height="24" width="24" onClick={this.handleDelete}/></TableData>);

		return row;
	}

	render(){
		return (
				<TableRow header={false} className="pantry-table-body-row" even={this.props.isEven}>
						{this.showRow()}
				</TableRow>
		);
	}
}

export default PantryTableIngredient;
