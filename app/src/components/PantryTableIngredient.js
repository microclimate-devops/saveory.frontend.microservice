import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableRowExpanded, TableData} from 'carbon-components-react'; 

class PantryTableIngredient extends Component{
	constructor(props){
		super(props);
		this.handleExpander = this.handleExpander.bind(this);
		this.state = {isExpanded: false};
	}

	static PropTypes = {
		dataAccessors: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		onDelete: PropTypes.func.isRequired,
		isEven: propTypes.bool.isRequired
	};

	handleExpander(e){
		//hide if shown, show if hidden
		isExpanded = this.state.isExpanded;
		this.setState({isExpanded: !isExpanded});
	}

	handleDelete(){
		this.props.onDelete(this.props.data);
	}

	showRow(){
		let row = [];
	}

	render(){
		return (
			<TableRow header={false} className="pantry-table-body-row" even={this.props.isEven}>
					<TableData className="" expanded={this.state.isExpanded} onClick={this.handleExpander}></TableData>
				<TableData className="">Item</TableData>
			</TableRow>
			<TableRowExpanded className="pantry-table-body-expanded-row" colSpan={6} expanded={this.state.isExpanded} even={this.props.isEven}>
				<td>Expanded</td>
			</TableRowExpanded> 
		);
	}
}

export default PantryTableIngredient;
