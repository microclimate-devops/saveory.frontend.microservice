import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, TableRowExpanded} from 'carbon-components-react'; 

class PantryTableIngredientExpand extends Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	static PropTypes = {
		data: PropTypes.object.isRequired,
		isEven: PropTypes.bool.isRequired,
		isExpanded: PropTypes.bool.isRequired,
		onDelete: PropTypes.func.isRequired
	};

	handleDelete(e){
		this.props.onDelete(this.props.data);
	}

	render(){
		return (
				<TableRowExpanded className="pantry-table-body-expanded-row" colSpan={6} expanded={this.props.isExpanded === undefined ? false : this.props.isExpanded} even={this.props.isEven}>
					<Button small={true} kind="primary" type="button" onClick={this.handleDelete}>Delete</Button>
				</TableRowExpanded> 
		);
	}
}

export default PantryTableIngredientExpand;

