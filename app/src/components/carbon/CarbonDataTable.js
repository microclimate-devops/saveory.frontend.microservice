import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonDataTableHeaderCell from './CarbonDataTableHeaderCell.js';
import CarbonDataTableBodyRow from './CarbonDataTableBodyRow.js';
import CarbonDataTableExpandedRow from './CarbonDataTableExpandedRow.js';
import CarbonDataTableRowExpander from './CarbonDataTableRowExpander.js';
import CarbonButton from './CarbonButton.js';

class CarbonDataTable extends Component{	
	/******************************/
	/*Component Logic	
	/******************************/
	constructor(props){
		super(props);
		this.showTableRow = this.showTableRow.bind(this);
		this.handleRemoveRow = this.handleRemoveRow.bind(this);
		this.state = {dataTable: undefined, emptyHeader: {title: "Empty", selector: "empty"}, emptyBody: {empty: "No Data"}};
	}

	static PropTypes = {
		headerData: PropTypes.array.isRequired,
		tableData: PropTypes.array.isRequired,
		tableDataIdSelector: PropTypes.string.isRequired,
		tableBindMethod: PropTypes.func.isRequired,
		tableRefreshMethod: PropTypes.func.isRequired,
		onRowDelete: PropTypes.func,
		enableExpandedRow: PropTypes.bool
	};

	static defaultProps = {
		enableExpandedRow: true,
		onRowDelete: function(ignore){console.log("Warning onRowDelete default prop was called. Please pass your own handler as the prop")}
	};

	handleRemoveRow(targetRow){
		console.log(targetRow);
		this.props.onRowDelete(targetRow);
	}

	showHeaderCell(headerItem){
		//Extract the info from the header item 
		return (
			<CarbonDataTableHeaderCell title={headerItem.title} key={headerItem.selector}/>
		);
	}

	showTableHead(){
		let headerRowItems = [];
		let headerData = this.props.headerData;
		if(Array.isArray(headerData) && headerData.length > 0){
			headerRowItems = headerData.map(this.showHeaderCell);
		}else{
			headerRowItems[0] = this.showHeaderCell(this.state.emptyHeader);
		}

		//If the expanded row is enabled, need to add an additonal cell to account for the expander size
		if(this.props.enableExpandedRow){
			headerRowItems.unshift(<th key="spacer" className="bx--table-header"></th>);
		}
    					
		return <thead className="bx--table-head"><tr className="bx--table-row">{headerRowItems}</tr></thead>;
			
	}

	showTableRowItem(headerCol, headerIndex, dataRow, rowID){
		return <td key={rowID+"-"+headerIndex}>{dataRow[headerCol.selector]}</td>;
	}

	showTableRow(dataRow, rowID){
		console.log("current row ID: "+rowID);
		//Order is determined by header
		const rowData = this.props.headerData.map((headerCol, i) => {return this.showTableRowItem(headerCol, i, dataRow, rowID)});

		//Check if row expansion is enabled
		if(this.props.enableExpandedRow){
			rowData.unshift(<CarbonDataTableRowExpander key={rowID+"-expander"}/>);
		}

		return (
			<CarbonDataTableBodyRow key={rowID}>{rowData}</CarbonDataTableBodyRow>
		);
	}

	showExpansionRow(dataRow, rowId){
		return (
			<CarbonDataTableExpandedRow key={rowId+"-expandedrow"}><CarbonButton text="Delete" onClick={this.handleRemoveRow} target={dataRow} isSmall={true}/></CarbonDataTableExpandedRow>
		);
	}

	customizeTableRows(tableData){
		let tableRows = [];
		let currRow = {};
		let currRowId = "";
		//Add special rows if needed
		for(var rowIndex in tableData){
			currRow = tableData[rowIndex];
			currRowId = currRow[this.props.tableDataIdSelector];
			tableRows.push(this.showTableRow(currRow, currRowId));
			if(this.props.enableExpandedRow){
				tableRows.push(this.showExpansionRow(currRow, currRowId));
			}
		}
		return tableRows
	}

	showTableBody(){
		const tableData = this.props.tableData;
		let tableItems = [];
		if(Array.isArray(tableData) && tableData.length > 0){
			tableItems = this.customizeTableRows(tableData);
		}else{
			tableItems[0] = this.showTableRow(this.state.emptyBody, 0);
		}
		console.log(tableItems);	
		return <tbody className="bx--table-body">{tableItems}</tbody>
	}

	componentDidMount(){
		//init table
		this.props.tableBindMethod(this.refs.table, undefined);
	}

	componentDidUpdate(prevProps, prevState){
		//update data table
		//console.log("Refreshing Table");
		this.props.tableRefreshMethod();
	}

	render(){
		return (
			<div className="bx--responsive-table-container carbon-data-table-container">
				<table ref="table" className="bx--responsive-table" data-table>
					{this.showTableHead()}
					{this.showTableBody()}
				</table>	
			</div>
		);
	}
}

export default CarbonDataTable;
