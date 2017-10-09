import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHead, TableHeader, TableRow} from 'carbon-components-react';
import PantryTableIngredient from './PantryTableIngredient.js';

/**
 * Manages showing the user's pantry as a table of ingredients
 */
class PantryTable extends Component{
	constructor(props){
		super(props);
		this.handleSortAction = this.handleSortAction.bind(this);
		this.state = {areRowsExpanded: {}, currSort: undefined, isSortedDesc: undefined};
	}

	static PropTypes = {
		header: PropTypes.array.isRequired,
		data: PropTypes.array.isRequired,
		fieldEditable: PropTypes.array.isRequired,
		onRowDelete: PropTypes.func.isRequired,
		onRowEdit: PropTypes.func.isRequired,
		tableDataIdSelector: PropTypes.func.isRequired
	};

	/**
	 * Sort the selected column
	 * @propsUsed {this.props.data}
	 * @stateUsed {this.state.currSort, this.state.isSortedDesc}
	 * @calls {JSON.parse, JSON.stringify, sortedIngredients.sort, String.toLowerCase}
	 * @return {array} - The sorted array of ingredient objects
	 */
	sortIngredients(){
		//don't alias the prop
		let sortedIngredients = JSON.parse(JSON.stringify(this.props.data));
		let sortSelector = this.state.currSort;
		let sortIsDesc = this.state.isSortedDesc;

		if(sortSelector !== undefined && sortIsDesc !== undefined){
			sortedIngredients.sort(
				(a, b) => {
					let aTargetData = a[sortSelector];
					let bTargetData = b[sortSelector];
					if(typeof aTargetData === "number"){
						return sortIsDesc ?
							bTargetData - aTargetData :
							aTargetData - bTargetData;
					}else{
						//ignore case if string
						if(typeof aTargetData === "string"){
							aTargetData = aTargetData.toLowerCase();
							bTargetData = bTargetData.toLowerCase();
						}
						return sortIsDesc ?
							bTargetData > aTargetData :
							aTargetData > bTargetData;
					}
				}
			);
		}
		return sortedIngredients;
	}

	/**
	 * Updates the sort direction state when the user clicks a header
	 * @param {param_type} e - click event
	 * @stateUsed {this.state.isSortedDesc}
	 * @calls {e.target.getAttribute, this.setState}
	 */
	handleSortAction(e){
		const newSort = e.target.getAttribute('id');
		const currSortDir = this.state.isSortedDesc;

		//update state
		this.setState({isSortedDesc: !currSortDir, currSort: newSort});
	}

	/**
	 * Determines whether the current sort is ascending or descending
	 * @param {param_type} selector- the header selector
	 * @stateUsed {this.state.currSort, this.state.isSortedDesc}
	 * @return {string} - "ASC" or "DESC
	 */
	determineHeaderSortDir(selector){
		let sortDir = undefined;
		if(this.state.currSort === selector){
			sortDir = this.state.isSortedDesc ? "DESC" : "ASC";
		}else{
			sortDir = "ASC";
		}
		return sortDir;
	}

	/**
	 * Puts together the cells of the header
	 * @propsUsed {this.props.header}
	 * @stateUsed {this.state.currSort}
	 * @calls {Array.isArray, JSON.stringify, this.props.header.map, this.determineHeaderSortDir}
	 * @return {Array(JSX)} - List of TableHeader components
	 */
	showIngredientHeader(){
		const header = this.props.header;
		if(Array.isArray(header)){
			return header.map((headerItem, i) => {return <TableHeader key={i} sortDir={this.determineHeaderSortDir(headerItem)} onClick={this.handleSortAction} className={"table-header-sortable" + (this.state.currSort === headerItem ? " pantry-table-header-sort-selected": "")} id={headerItem}>{headerItem}</TableHeader>});
		}
	}

	/**
	 * Shows the header row of the table
	 * @propsUsed {this.props.data, this.props.data}
	 * @calls {this.showIngredientHeader}
	 * @return {TableRow}
	 */
	showHeader(){
		let headerRow = undefined;
		//Show the header if there is data to show in the table
		if(this.props.data.length > 0){
			headerRow = (
				<TableRow className="pantry-table-header-row" header={true} even={true}>
					<TableHeader/>
					{this.showIngredientHeader()}
					<TableHeader>Actions</TableHeader>
				</TableRow>
			);
		}
		return headerRow;
	}

	/**
	 * Shows the table body of ingredients
	 * @propsUsed {this.props.data, this.props.header, this.props.fieldEditable, this.props.onRowDelete, this.props.onRowEdit}
	 * @calls {Array.isArray, this.sortIngredients, ingredients.map}
	 * @return {Array(PantryTableIngredient)} - list of ingredient rows
	 */
	showIngredients(){
		if(Array.isArray(this.props.data)){
			//sort the ingredients according to current settings
			let ingredients = this.sortIngredients();
			//Create a list of JSX ingredient rows
			return ingredients.map((ingredient, i) => {return <PantryTableIngredient key={"ingredient-"+i} dataAccessors={this.props.header} data={ingredient} fieldEditable={this.props.fieldEditable} onDelete={this.props.onRowDelete} onEdit={this.props.onRowEdit} isEven={false}/>});
		}
	}

	/**
	 * Shows the table complete with header and body
	 * @calls {this.showHeader, this.showIngredients}
	 * @return {JSX}
	 */
	render(){
		//<TableHeader />
		return(
		<Table className="pantry-table" containerClassName="pantry-table-container">
			<TableHead className="pantry-table-head">
				{this.showHeader()}
			</TableHead>
			<TableBody>
				{this.showIngredients()}
			</TableBody>
		</Table>
		);
	}
}

export default PantryTable;
