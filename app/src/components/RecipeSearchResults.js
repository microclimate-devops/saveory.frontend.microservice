import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'carbon-components-react';
import RecipeSearchItem from './RecipeSearchItem';
import RecipeDisplay from './RecipeDisplay';
import MakeRecipe from './MakeRecipe';

/**
 * Manages displaying a list of recipes in a search results container
 */
class RecipeSearchResults extends Component{
	constructor(props){
		super(props);
		this.handleResultSelect = this.handleResultSelect.bind(this);
		this.closeRecipeDisplay = this.closeRecipeDisplay.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.showPaginatorRangeText = this.showPaginatorRangeText.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.state = {
			pagination: {
				sizes: [5, 10, 15],
				size: 15,
				page: 1,
				lastPage: undefined
			},
			resultItemTitleSelector: "name",
			recipeIndex: 0,
			recipeDisplayOpen: false
		};
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired,
		recipes: PropTypes.array.isRequired
	};

	closeRecipeDisplay(e){
		this.setState({recipeDisplayOpen: false});
	}

	handleKeyDown(e){
    //Call onClose if esc was pressed
    if (e.which === 27 && this.state.open) {
      this.closeRecipeDisplay(e);
    }
  }

	/**
	 * When the user clicks a result, send that info through prop handler
	 * @param {DOM event} e - the click event on the recipe result
	 * @propsUsed {this.props.onResultSelected}
	 * @calls {Number, e.target.getAttribute, this.props.onResultSelected}
	 */
	handleResultSelect(index){
		this.setState({recipeIndex:index, recipeDisplayOpen:true});
	}

	handlePageChange(changeObj){
		let pagination = this.state.pagination;
		pagination.size = changeObj.pageSize;
		pagination.page = changeObj.page;
		this.setState({pagination: pagination});
	}

	showPaginatorRangeText(startIndex, endIndex, totalItems){
		return startIndex + " - " + endIndex + " of " + totalItems;
	}

	showPaginator(endIndex, totalItems, paginationData){
		return (
			<Pagination backwardText="" forwardText="" className="recipe-search-results-paginator" itemRangeText={this.showPaginatorRangeText}
				onChange={this.handlePageChange} pageSizes={paginationData.sizes} totalItems={totalItems} page={paginationData.page} pageSize={paginationData.size}
				isLastPage={endIndex === totalItems} />
		);
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
	showResultItems(startIndex, endIndex){
		let resultItems = [];
		const recipes = this.props.recipes;
		for(var i = startIndex; i < endIndex; i++){
			resultItems.push(<RecipeSearchItem key={i} recipe={recipes[i]} recipeIndex={i}  onClick={this.handleResultSelect} />);
		}
		return resultItems;
	}

	showResultPages(){
		let pagesEle = null;
		const paginationData = this.state.pagination;
		const currPage = paginationData.page - 1;
		const totalItems = this.props.recipes.length;
		let startIndex = undefined;
		let endIndex = undefined;
		if(totalItems > 0){
			//get start and end indeces
			startIndex = currPage * paginationData.size;
			endIndex = startIndex + paginationData.size;
			//make sure the endIndex doesn't go past the end
			if(endIndex > totalItems){
				endIndex = totalItems;
			}
			console.log("start: "+startIndex+". end: "+endIndex);
			pagesEle = (
				<div className="recipe-search-results-pagination">
					{this.showPaginator(endIndex, totalItems, paginationData)}
					<div className="recipe-search-result-items">
						{this.showResultItems(startIndex, endIndex)}
					</div>
				</div>
			);
		}
		return pagesEle;
	}

	/**
	 * Show the list of recipe results
	 * @calls {this.showResultItems}
	 * @return {JSX}
	 */
	render(){
		return (
			<div className="recipe-search-results-container">
					{this.showResultPages()}
					<MakeRecipe userToken={this.props.userToken} recipe={this.props.recipes[this.state.recipeIndex]}
			    open={this.state.recipeDisplayOpen} closeModal={this.closeRecipeDisplay} handleKeyDown={this.handleKeyDown} />
			</div>
		);
	}
}

export default RecipeSearchResults;
