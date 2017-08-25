import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableData} from 'carbon-components-react'; 

class PantryTableIngredient extends Component{
	constructor(props){
		super(props);
		this.handleExpander = this.handleExpander.bind(this);
	}

	static PropTypes = {
		dataAccessors: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		isExpanded: PropTypes.bool.isRequired,
		onExpander: PropTypes.func.isRequired,
		isEven: PropTypes.bool.isRequired
	};

	handleExpander(e){
		this.props.onExpander(this.props.data.item);
	}

	showRow(){
		let row = [];
		let selector = "";
		
		//Add expander
		row.push(<TableData key="expander" expanded={this.props.isExpanded === undefined ? false : this.props.isExpanded} onClick={this.handleExpander}></TableData>);
		//use the data accesssors prop to create the row with data in the correct order
		for(var accessor of this.props.dataAccessors){
			selector = accessor.selector;
			row.push(<TableData key={selector} className="pantry-table-ingredient">{this.props.data[selector]}</TableData>);
		}

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
