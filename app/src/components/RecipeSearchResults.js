import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
		this.state = {
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
		return this.props.recipes.map((recipe, i) => {return <RecipeSearchItem key={i} recipe={recipe} recipeIndex={i}  onClick={this.handleResultSelect} />});
	}

	/**
	 * Show the list of recipe results
	 * @calls {this.showResultItems}
	 * @return {JSX}
	 */
	render(){
		return (
			<div className="recipe-search-results-container">
					{this.showResultItems()}
					<MakeRecipe userToken={this.props.userToken} recipe={this.props.recipes[this.state.recipeIndex]}
			    open={this.state.recipeDisplayOpen} closeModal={this.closeRecipeDisplay} handleKeyDown={this.handleKeyDown} />
			</div>
		);
	}
}

export default RecipeSearchResults;
