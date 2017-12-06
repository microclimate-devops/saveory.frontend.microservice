import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeSearchItem extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    recipe: PropTypes.object.isRequired,
    recipeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isMini: PropTypes.bool
  };

  static defaultProps = {
    isMini: false
  };

  handleClick(e){
    this.props.onClick(this.props.recipeIndex);
  }

  parseCookingTime(timeStr){
    if(timeStr === undefined || timeStr.length === 0){
      return "";
    }

    let inSeconds = Number(timeStr);
    inSeconds = inSeconds > 0 ? inSeconds : 0;
    let minStr = inSeconds/60 + " mins";
    return minStr;
  }


  /**
   * Puts together a list of recipe tags
   * @param {array(string)} tags- the recipes tag array
   * @calls {console.log, tags.map}
   * @return {JSX} - null or the recipe's tag list elements
   */
  showTagList(tags){
      if(tags === null){
        console.log("tag is null");
        return null;
      }

      return tags.map((tag, i) => {
        return (
          <li key={i} className="recipe-search-item-tag">
            <p>{tag}</p>
          </li>
        );
      });
    }

  showMiniRecipeData(){
    const recipe = this.props.recipe;
    let recipeItems = [];

    //create different versions based on the existence of an image url
    if(recipe.imageURL){
      recipeItems.push(<div key="recipe-image"  className="recipe-search-item-mini-image"><img src={recipe.imageURL} alt=""/></div>);
      recipeItems.push(<div key="recipe-time" className="recipe-search-item-mini-time"><p>{this.parseCookingTime(recipe.time)}</p></div>);
    }else{
      recipeItems.push(<div key="recipe-title" className="recipe-search-item-mini-title"><p>{recipe.name}</p></div>);
    }

    return (
      <div className="recipe-search-item-mini-container" onClick={this.handleClick}>
        {recipeItems}
      </div>
    );
  }

  showRecipeData(){
      const recipe = this.props.recipe;
      let recipeItems = [];

      //create different versions based on the existence of an image url
      if(recipe.imageURL){
        if(recipe === null || recipe.tag === null){
          console.log("something messed up with recipe at "+this.props.recipeIndex);
          console.log(recipe);
        }

        recipeItems.push(<div key="recipe-image"  className="recipe-search-item-image"><img src={recipe.imageURL} alt=""/></div>);
        recipeItems.push(
            <div key="recipe-text-data"className="recipe-search-item-text-data">
              <div className="recipe-search-item-time"><p>{this.parseCookingTime(recipe.time)}</p></div>
              <div className="recipe-search-item-title"><p>{recipe.name}</p></div>
              <div className="recipe-search-item-tags"><ul>{this.showTagList(recipe.tag)}</ul></div>
            </div>
        );
      }else{
        recipeItems.push(<div key="recipe-title" className="recipe-search-item-title-only"><p>{recipe.name}</p></div>);
      }

      if(recipe && recipe.author === "MyRecipes"){
        console.log("test");
        console.log(recipeItems);
      }

      return (
        <div className="recipe-search-item-container" onClick={this.handleClick}>
          {recipeItems}
        </div>
      );
  }

  showRecipe(){
    let recipeView = null;
    if(this.props.isMini){
      recipeView = this.showMiniRecipeData();
    }else{
      recipeView = this.showRecipeData();
    }
    return recipeView;
  }

  render(){
    return this.showRecipe();
  }
}

export default RecipeSearchItem;
