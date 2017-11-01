import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Manages displaying a list of recipes in a search results container
 */
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

	static propTypes = {
		recipes: PropTypes.array.isRequired,
		onResultSelected: PropTypes.func.isRequired
	};

	/**
	 * When the user clicks a result, send that info through prop handler
	 * @param {DOM event} e - the click event on the recipe result
	 * @propsUsed {this.props.onResultSelected}
	 * @calls {Number, e.target.getAttribute, this.props.onResultSelected}
	 */
	handleResultSelect(e){
		const elementIndex = Number(e.target.getAttribute('id'));
		this.props.onResultSelected(elementIndex);
	}

	/**
	 * Creates a list item for the recipe results
	 * @param {object} recipe - a recipe to show as
	 * @param {int} i - the index of the recipe list item to show
	 * @stateUsed {this.state.resultItemTitleSelector}
	 * @calls {i.toString}
	 * @return {JSX}
	 */
	showResultItem(recipe, i){
		return (
			<li key={i} id={i.toString()} className="recipe-search-results-item" onClick={this.handleResultSelect}>
				{recipe[this.state.resultItemTitleSelector]}
			</li>
		);
	}

	/**
	 * Creates a list to show all the recipe results
	 * @propsUsed {this.props.recipes}
	 * @calls {this.props.recipes.map, this.showResultItem}
	 * @return {Array(JSX)}
	 */
	showResultItems(){
		return this.props.recipes.map((item, i) => {return this.showResultItem(item, i)});
	}

	/**
	 * Show the list of recipe results
	 * @calls {this.showResultItems}
	 * @return {JSX}
	 */
	render(){
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
