import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import JsonTable from 'react-json-table';

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
		};
	}
	static PropTypes = {
		recipes: PropTypes.array.isRequired,
		onResultSelected: PropTypes.func.isRequired
	};

	handleResultSelect(e, row){
		console.log("row selected: "+JSON.stringify(row));
		this.props.onResultSelected(row.index);
	}

	render(){
		const columns = [{key: 'name', label: 'Results'}];
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
		return (
			<div className="recipe-search-results-container">
				<JsonTable rows={this.props.recipes} columns={columns} onClickRow={this.handleResultSelect}/>
			</div>
		);
	}	
}

export default RecipeSearchResults;
