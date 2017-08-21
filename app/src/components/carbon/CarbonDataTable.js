import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonDataTable extends Component{
	static PropTypes = {
		headerData: PropTypes.array.isRequired,
		tableData: PropTypes.array.isRequired
	};

	showTableHead(){
		if(Array.isArray(this.props.headerData) && this.props.headerData.length > 0){
			return this.props.headerData.map(this.showHeaderCell);
		}
	}

	showTableBody(){
		if(Array.isArray(this.props.tableData) && this.props.tableData.length > 0){
			return this.props.tableData.map(this.showTableRow)
		}
	}

	render(){
		return (
			<div className="bx--responsive-table-container carbon-data-table-container">
				<table class="bx--responsive-table bx--responsive-table--static-size" data-table>
    					<thead class="bx--table-head">
					</thead>
					<tbody class="bx--table-body">
					</tbody>
				</table>	
			</div>
		);
	}
}

export default CarbonDataTable;
