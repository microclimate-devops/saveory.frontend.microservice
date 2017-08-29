import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHead, TableHeader, TableRow} from 'carbon-components-react'; 
import PantryTableIngredient from './PantryTableIngredient.js';
import PantryTableIngredientExpand from './PantryTableIngredientExpand.js';

class PantryTable extends Component{
	constructor(props){
		super(props);
		this.handleExpandingRow = this.handleExpandingRow.bind(this);
		this.handleSortAction = this.handleSortAction.bind(this);
		this.state = {areRowsExpanded: {}, currSort: undefined, isSortedDesc: undefined};
	}

	static PropTypes = {
		header: PropTypes.array.isRequired,
		data: PropTypes.array.isRequired,
		onRowDelete: PropTypes.func.isRequired,
		tableDataIdSelector: PropTypes.func.isRequired
	};

	handleExpandingRow(ingredientId){
		let areRowsExpanded = this.state.areRowsExpanded;
		//invert the value if present
		if(areRowsExpanded[ingredientId]){
			areRowsExpanded[ingredientId] = !areRowsExpanded[ingredientId];
		}else{ //If not present, then it's the first time expanding
			areRowsExpanded[ingredientId] = true;
		}
		this.setState({areRowsExpanded: areRowsExpanded});
	}

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
					}else{ //standard string sort
						return sortIsDesc ?
							bTargetData > aTargetData :
							aTargetData > bTargetData;
					}
				}
			);
		}

		return sortedIngredients;
	}

	showIngredients(){		
		if(Array.isArray(this.props.data)){
			//sort the ingredients according to current settings
			let ingredients = this.sortIngredients();						
			//Create a list of JSX ingredient rows
			return ingredients.map((ingredient, i) => {return [<PantryTableIngredient key={"ingredient-"+i} dataAccessors={this.props.header} data={ingredient} isExpanded={this.state.areRowsExpanded[ingredient.item]} onExpander={this.handleExpandingRow} isEven={false}/>, <PantryTableIngredientExpand key={"expand-"+i} data={ingredient} isExpanded={this.state.areRowsExpanded[ingredient.item]} isEven={false} onDelete={this.props.onRowDelete}/>]});
		}
	}

	handleSortAction(e){
		const newSort = e.target.getAttribute('id');
		const currSortDir = this.state.isSortedDesc;

		/*console.log("sort clicked");
		console.log(e.target);*/

		//update state
		this.setState({isSortedDesc: !currSortDir, currSort: newSort});
	}

	determineHeaderSortDir(selector){
		let sortDir = undefined;
		if(this.state.currSort === selector){
			sortDir = this.state.isSortedDesc ? "DESC" : "ASC";
		}else{
			sortDir = "ASC";
		}
		return sortDir;
	}

	showHeader(){
		if(Array.isArray(this.props.data)){
			//console.log("header data: "+ JSON.stringify(this.props.header));
			return this.props.header.map((headerItem, i) => {return <TableHeader key={i} sortDir={this.determineHeaderSortDir(headerItem.selector)} onClick={this.handleSortAction} className={"table-header-sortable" + (this.state.currSort === headerItem.selector ? " pantry-table-header-sort-selected": "")} id={headerItem.selector}>{headerItem.title}</TableHeader>});
		}
	}

	render(){
		return(
		<Table className="pantry-table" containerClassName="pantry-table-container">
			<TableHead className="pantry-table-head">
				<TableRow className="pantry-table-header-row" header={true} even={true}>
					<TableHeader />
					{this.showHeader()}
				</TableRow>
			</TableHead>
			<TableBody>
				{this.showIngredients()}
			</TableBody>
		</Table>
		);
	}
}

export default PantryTable;
