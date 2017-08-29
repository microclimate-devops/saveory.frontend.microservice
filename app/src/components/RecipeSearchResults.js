import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import JsonTable from 'react-json-table';

class RecipeSearchResults extends Component{
	constructor(props){
		super(props);
		this.handleResultSelect = this.handleResultSelect.bind(this);
		this.state = {
			resultTableOptions: {
				//sort
				defaultSortName: 'item',
				defaultSortOrder: 'desc',

				//select
				mode: 'radio',
				bgColor: 'green',
				hideSelectColumn: true,
				clickToSelect: true,

				//row click
				onRowSelect: this.handleResultSelect
			},
			resultItemTitleSelector: "name"
		};
	}
	static PropTypes = {
		recipes: PropTypes.array.isRequired,
		onResultSelected: PropTypes.func.isRequired
	};

	handleResultSelect(e){
		const elementIndex = Number(e.target.getAttribute('id'));
		console.log("row selected: "+elementIndex);
		this.props.onResultSelected(elementIndex);
	}

	showResultItem(item, i){
		return (
			<li key={i} id={i.toString()} className="recipe-search-results-item" onClick={this.handleResultSelect}>
				{item[this.state.resultItemTitleSelector]}
			</li>
		);
	}

	showResultItems(){
		return this.props.recipes.map((item, i) => {return this.showResultItem(item, i)});
	}

	render(){
		//const columns = [{key: 'name', label: 'Results'}];
		/*const resultTableOptions = {
				//sort
				defaultSortName: 'item',
				defaultSortOrder: 'desc',

				//select
				mode: 'radio',
				bgColor: 'green',
				hideSelectColumn: true,
				clickToSelect: true,

				//row click
				onRowSelect: this.handleResultSelect
			};*/
		/*
				<BootstrapTable data={this.props.recipes} options={resultTableOptions} hover={true}>
				      <TableHeaderColumn isKey={true} dataField='name' datasort={true}>Results</TableHeaderColumn>
				  </BootstrapTable>
		*/
		//<JsonTable rows={this.props.recipes} columns={columns} onClickRow={this.handleResultSelect}/>
		return (
			<div className="recipe-search-results-container">
				<ul className="recipe-search-results-list">
					{this.showResultItems()}
				</ul>
			</div>
		);
	}	
}

export default RecipeSearchResults;
