import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableRow, Icon, Toggle} from 'carbon-components-react';
import TableData from './carbon/TableData.js';
var moment = require('moment');

/**
 * Manages each ingredient row in the table
 */
class PantryTableIngredient extends Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.fieldChanged = this.fieldChanged.bind(this);
		this.handleFilterToggle = this.handleFilterToggle.bind(this);
		this.state = {
			isEditing: false,
			data: undefined,
			filterType: "includedIngredients"
		};
	}

	static propTypes = {
		dataAccessors: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		ingredientIdField: PropTypes.string.isRequired,
		fieldEditable: PropTypes.array.isRequired,
		onDelete: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		onFilterUpdate: PropTypes.func.isRequired,
		filters: PropTypes.object.isRequired,
		includeIngredientFilterType: PropTypes.string.isRequired,
		isEven: PropTypes.bool.isRequired
	};

	/**
	 * Updates the internal ingredient data state with new data from props
	 * @param {object} nextProps
	 * @calls {this.setData}
	 */
	componentWillReceiveProps(nextProps){
		const data = nextProps.data;
		this.setData(data);
	}

	/**
	 * Updates state.data
	 * @param {object} data - The new ingredient data
	 * @calls {this.setState}
	 */
	setData(data){
		this.setState({data: data});
	}

	/**
	 * gets the data sent via the props or state.data if it's defined
	 * @propsUsed {this.props.data}
	 * @stateUsed {this.state.data}
	 * @calls {this.setData}
	 * @return {object} - the ingredient data
	 */
	getData(){
		let data = this.state.data;
		if(data === undefined){
			data = this.props.data;
			this.setData(data);
		}
		return data;
	}


	/**
	 * Calls the delete handler passed in props
	 * @param {DOM event} e
	 * @propsUsed {this.props.onDelete}
	 * @calls {this.props.onDelete, this.getData}
	 */
	handleDelete(e){
		this.props.onDelete(this.getData());
	}

	/**
	 * Handles sending updated data to prop handler
	 * @param {DOM event} e
	 * @propsUsed {this.props.onEdit}
	 * @stateUsed {this.state.isEditing}
	 * @calls {this.setState, this.props.onEdit, this.getData}
	 */
	handleEdit(e){
		let isEditing = this.state.isEditing;
		//Invert the status
		this.setState({isEditing: !isEditing});

		//If the state was in edit mode, then the user clicked the save button and we should send the edits
		if(isEditing){
			this.props.onEdit(this.getData());
		}
	}

	/**
	 * Get the current state of the filter to see if it's in use
	 * @propsUsed {this.props.filters, this.props.includeIngredientFilterType, this.props.data, this.props.ingredientIdField}
	 * @return {boolean} - determines if the filter is in use
	 */
	getFilterStatus(){
		const filters = this.props.filters;
		const filterType = this.props.includeIngredientFilterType
		const filter = this.props.data[this.props.ingredientIdField];
		let val = false;
		if(typeof filters[filterType] === 'object'){
			val = filters[filterType][filter] === true
		}
		return val;
	}

	/**
	 * Gather the filter data and send new toggle value through prop handler
	 * @param {DOM event} e
	 * @propsUsed {this.props.onFilterUpdate, this.props.includeIngredientFilterType, this.props.data, this.props.ingredientIdField}
	 * @calls {this.props.onFilterUpdate, this.getFilterStatus}
	 */
	handleFilterToggle(e){
		this.props.onFilterUpdate(this.props.includeIngredientFilterType, this.props.data[this.props.ingredientIdField], !this.getFilterStatus());
	}

	/**
	 * Updates internal state when field changes
	 * @param {event.target} target
	 * @propsUsed {this.props.data}
	 * @stateUsed {this.state.data}
	 * @calls {target.getAttribute, this.setState}
	 */
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

	/**
	 * Creates an icon prop if the field needs one
	 * @param {string} text - the field data
	 * @calls {moment, .isValid, now.from, .endsWith}
	 * @return {object} - the icon info
	 */
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

	/**
	 * Adds row action icons for deleting and updating (or saving) an ingredient
	 * @param {Array} row - The pantry row for the ingredient
	 * @stateUsed {this.state.isEditing}
	 * @calls {row.push}
	 */
	addRowActions(row){
		const rowIdentifier = this.props.data[this.props.ingredientIdField];

		//Add edit and delete
		row.push(<TableData key="modify-actions" className="pantry-table-row-actions">
				<Icon className="delete-ingredient-icon" name={this.state.isEditing ? "checkmark--outline" : "edit"} height="24" width="24" onClick={this.handleEdit}/>
				<Icon className="delete-ingredient-icon" name="delete" height="24" width="24" onClick={this.handleDelete}/>
			</TableData>);

		//Add 'filter recipe search' toggle
		row.push(
			<TableData key="filter-action" className="pantry-table-row-actions">
				<Toggle className="ingredient-filter-toggle" id={rowIdentifier+"-toggle"} onToggle={this.handleFilterToggle} toggled={this.getFilterStatus()} labelA="Exclude" labelB="Include" />
			</TableData>
		);
	}

	/**
	 * Shows the ingredient row with data and actions
	 * @propsUsed {this.props.dataAccessors, this.props.isExpanded, this.props.data, this.props.fieldEditable}
	 * @stateUsed {this.state.isEditing}
	 * @calls {row.push, this.determineIcon, this.addRowActions}
	 * @return {Array(TableData)}
	 */
	showRow(){
		const dataAccessors = this.props.dataAccessors;
		let row = [];
		let editable = undefined;
		let accessor = undefined;
		let data = undefined;

		//Add expander
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

	/**
	 * Setup the ingredient row for use in the table
	 * @propsUsed {this.props.isEven}
	 * @stateUsed {this.state.isEditing}
	 * @calls {this.showRow}
	 * @return {JSX}
	 */
	render(){
		return (
				<TableRow header={false} className={"pantry-table-body-row " + (this.state.isEditing ? "ingredient-editing" : "")} even={this.props.isEven}>
						{this.showRow()}
				</TableRow>
		);
	}
}

export default PantryTableIngredient;
