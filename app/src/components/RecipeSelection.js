import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'carbon-components-react';
import Slider from 'react-slick';
import RecipeSearchItem from './RecipeSearchItem';

class RecipeSelection extends Component{
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    recipeIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  showResultItems(){
    const recipes = this.props.recipes;
    if(recipes.length > 0){
      return [
        <RecipeSearchItem key={0} recipe={recipes[0]} recipeIndex={0}  onClick={this.props.onChange} isMini={true}/>,
      ];
      //return recipes.map((recipe, i) => {return <RecipeSearchItem key={i} recipe={recipe} recipeIndex={i}  onClick={this.props.onChange} isMini={true}/>});
    }else{
      return [<div key={1}>test</div>, <div key={2}>test</div>,<div key={3}>test</div>,<div key={4}>test</div>];
    }
  }


  render(){
    return (
      <Slider slidesToShow={3} slidesToScroll={1} speed={500} arrows={true} dots={true} swipeToSlide={true} slickGoTo={this.props.recipeIndex} infinite={false}>
        {this.showResultItems()}
      </Slider>
    );
  }

}

export default RecipeSelection;
