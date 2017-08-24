import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHead, TableHeader, TableRow, TableRowExpanded, TableData} from 'carbon-components-react'; 

class PantryTable extends Component{
	static PropTypes = {
		header: PropTypes.array.isRequired,
		data: PropTypes.array.isRequired,
		onRowDelete: PropTypes.func.isRequired,
		tableDataIdSelector: PropTypes.func.isRequired
	};

	render(){
		return(
		<Table className="pantry-table" containerClassName="pantry-table-container">
			<TableHead className="pantry-table-head">
				<TableRow className="pantry-table-header-row" header={true} even={true}>
					<TableHeader />
					<TableHeader className="pantry-table-header-item">Test</TableHeader>	
					<TableHeader className="pantry-table-header-item">Test 2</TableHeader>	
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow header={false} className="pantry-table-body-row" even={true}>
					<TableData className="" expanded={false} onClick={function(e){console.log("clicked expander")}}></TableData>
					<TableData className="">Item</TableData>
				</TableRow>
				<TableRowExpanded className="pantry-table-body-expanded-row" colSpan={6} expanded={true} even={false}>
					<td>Expanded</td>
				</TableRowExpanded> 
			</TableBody>
		</Table>
		);
	}
}

export default PantryTable;
