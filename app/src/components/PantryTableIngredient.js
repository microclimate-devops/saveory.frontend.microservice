import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableRow, Icon, Toggle} from 'carbon-components-react'; 
import TableData from './carbon/TableData.js';
var moment = require('moment');

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

	componentWillReceiveProps(nextProps){
		const data = nextProps.data;
		this.setData(data);
	}

	setData(data){
		this.setState({data: data});
	}

	//gets the data sent via the props or state.data if it's defined
	getData(){
		let data = this.state.data;
		if(data == undefined){
			data = this.props.data;
			this.setData(data);
		}
		return data;
	}


	handleDelete(e){
		this.props.onDelete(this.getData());
	}

	handleEdit(e){
		let isEditing = this.state.isEditing;
		//Invert the status
		this.setState({isEditing: !isEditing});

		//If the state was in edit mode, then the user clicked the save button and we should send the edits
		if(isEditing){
			this.props.onEdit(this.getData());
		}
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

	determineIcon(text){
		let iconProp = undefined;
		//If the text is a date, add a freshness indicator
		if(moment(text, "YYYY-MM-DD", true).isValid()){
			const now = moment();
			const exp = moment(text);
			let iconClass = "red"; //the item has expired
			
			//Check if still good
			if(now.from(exp).endsWith("ago")){
				iconClass = "green";
			}

			//setup icon
			iconProp = {name: "pa", height:"20", width: "20", className: "date-indicator icon-"+iconClass};
		}

		return iconProp;		
	}	

	addRowActions(row){
		//Add edit and delete
		row.push(<TableData key="actions" className="pantry-table-row-actions">
				<Icon className="delete-ingredient-icon" name={this.state.isEditing ? "checkmark--outline" : "edit"} height="24" width="24" onClick={this.handleEdit}/>
				<Icon className="delete-ingredient-icon" name="delete" height="24" width="24" onClick={this.handleDelete}/>
			</TableData>);

		//Add 'filter recipe search' toggle
	}

	showRow(){
		const dataAccessors = this.props.dataAccessors;
		let row = [];
		let editable = undefined;
		let accessor = undefined;
		let data = undefined;
		
		//Add expander
		//row.push(<TableData key="expander" expanded={this.props.isExpanded === undefined ? false : this.props.isExpanded} onClick={this.handleExpander}></TableData>);
		row.push(<TableData key="expander"/>);
		//use the data accesssors prop to create the row with data in the correct order
		for(var i = 0; i < dataAccessors.length; i++){
			accessor = dataAccessors[i];
			data = this.props.data[accessor];

			//Determine if the current field is allowed to be edited
			if(!this.props.fieldEditable[i]){
				editable = false;
			}else{
				editable = this.state.isEditing;
			}

			row.push(<TableData editable={editable} onChange={this.fieldChanged} id={accessor} key={accessor} className="pantry-table-ingredient" iconData={this.determineIcon(data)}>{data}</TableData>);
		}

		this.addRowActions(row);

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
