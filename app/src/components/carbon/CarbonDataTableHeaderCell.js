import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonDataTableHeaderCell extends Component{
	static propTypes = {
		title: PropTypes.string.isRequired
	};

	componentDidMount(){
		//set custom attributes
		this.refs.headercell.setAttribute("tabindex", "0");	
		this.refs.headercell.setAttribute("data-event", "sort");	

		this.refs.headercellspan.setAttribute("width", "10");	
		this.refs.headercellspan.setAttribute("heigth", "5");	
		this.refs.headercellspan.setAttribute("viewBox", "0 0 10 5");	
		this.refs.headercellspan.setAttribute("fill-rule", "evenodd");	
		
		this.refs.headercellspanpath.setAttribute("d", "M10 0L5 5 0 0z");	
	}

	render(){
		return (
			<th ref="headercell" className="bx--table-header bx--table-sort">
			  <span>{this.props.title}</span>
			  <svg className="bx--table-sort__svg" ref="headercellspan">
			    <path ref="headercellspanpath"></path>
			  </svg>
			</th>	
		);
	}
}

export default CarbonDataTableHeaderCell;
