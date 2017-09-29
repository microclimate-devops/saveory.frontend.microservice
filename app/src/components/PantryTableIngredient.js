import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableRow, Icon} from 'carbon-components-react'; 
import TableData from './carbon/TableData.js';

class PantryTableIngredient extends Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.fieldChanged = this.fieldChanged.bind(this);
		this.state = {isEditing: false, data: undefined};
	}

	static PropTypes = {
		dataAccessors: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		fieldEditable: PropTypes.array.isRequired,
		onDelete: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		isEven: PropTypes.bool.isRequired
	};

	//gets the data sent via the props or state.data if it's defined
	getData(){
		let data = this.state.data
		if(data === undefined){
			data = this.props.data;
		}
		return data;
	}


	handleDelete(e){
		this.props.onDelete(this.getData());
	}

	handleEdit(e){
		let isEditing = this.state.isEditing;
		//If the state is currently in edit mode, then the user clicked the save button and we should send the edits
		if(isEditing){
			this.props.onEdit(this.getData());
		}

		//Invert the status
		this.setState({isEditing: !isEditing});

	}

	fieldChanged(target){
		let data = this.state.data

		//set to prop value if first time
		if(data === undefined){
			data = this.props.data;
		}

		//update the data
		data[target.getAttribute('id')] = target.value;

		this.setState({data: data});
	}

	showRow(){
		const dataAccessors = this.props.dataAccessors;
		let row = [];
		let editable = undefined;
		let accessor = undefined;
		
		//Add expander
		//row.push(<TableData key="expander" expanded={this.props.isExpanded === undefined ? false : this.props.isExpanded} onClick={this.handleExpander}></TableData>);
		row.push(<TableData key="expander"/>);
		//use the data accesssors prop to create the row with data in the correct order
		for(var i = 0; i < dataAccessors.length; i++){
			accessor = dataAccessors[i];

			//Determine if the current field is allowed to be edited
			if(!this.props.fieldEditable[i]){
				editable = false;
			}else{
				editable = this.state.isEditing;
			}

			row.push(<TableData editable={editable} onChange={this.fieldChanged} id={accessor} key={accessor} className="pantry-table-ingredient">{this.props.data[accessor]}</TableData>);
		}

		//Add row actions
		row.push(<TableData key="actions" className="pantry-table-row-actions">
				<Icon className="delete-ingredient-icon" name="delete" height="24" width="24" onClick={this.handleDelete}/>
				<Icon className="delete-ingredient-icon" name={this.state.isEditing ? "checkmark--outline" : "edit"} height="24" width="24" onClick={this.handleEdit}/>
			</TableData>);

		return row;
	}

	render(){
		return (
				<TableRow header={false} className={"pantry-table-body-row " + (this.state.isEditing ? "ingredient-editing" : "")} even={this.props.isEven}>
						{this.showRow()}
				</TableRow>
		);
	}
}

export default PantryTableIngredient;
