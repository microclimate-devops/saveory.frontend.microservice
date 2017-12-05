import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'carbon-components-react';
import Chips, {Chip, theme, chipTheme} from 'react-chips';
import CarbonButton from './carbon/CarbonButton.js';

class RecipeSearchFilter extends Component{
  constructor(props){
    super(props);
    this.handleIncludedIngredientsChange = this.handleIncludedIngredientsChange.bind(this);
    this.handleExcludedIngredientsChange = this.handleExcludedIngredientsChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.state = {
      open: false
    };
  }

  static propTypes = {
    pantryIngredients: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    filterTypes: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
  }

  handleIncludedIngredientsChange(chips){
    this.props.onFilterChange(this.props.filterTypes.ingredient.include, chips);
  }

  handleExcludedIngredientsChange(chips){
    this.props.onFilterChange(this.props.filterTypes.ingredient.exclude, chips);
  }

  handleModalOpen(e){
    this.setState({open:true});
  }

  handleModalClose(e){
    this.setState({open: false});
  }

  /**
   * Is called when the keyboard is pressed, exits modal if ESC key is pressed
   * @param {DOM event} e-
   * @stateUsed {this.state.open}
   * @calls {this.handleModalClose}
   */
  handleKeyDown(e){
    //Call onClose if esc was pressed
    if (e.which === 27 && this.state.open) {
      this.handleModalClose(e);
    }
  }

  render(){
    return(
      <div className="recipe-search-filter-container">
        <CarbonButton text="Filter" addedClass="recipe-search-filter-button" onClick={this.handleModalOpen}/>
        <Modal className="recipe-search-filter-modal" onRequestClose={this.handleModalClose} modalLabel="Tune Recipe Results" modalHeading="Add Filters" open={this.state.open} onKeyDown={this.handleKeyDown} passiveModal={true}>
          <div className="recipe-search-filter-include-ingredients-container">
            <label>Include Ingredients</label>
            <Chips value={this.props.filters[this.props.filterTypes.ingredient.include]} onChange={this.handleIncludedIngredientsChange} suggestions={this.props.pantryIngredients}
              theme={theme} fromSuggestionsOnly={true} uniqueChips={true} renderChip={value => <Chip theme={chipTheme}>{value}</Chip>}/>
          </div>
          <div className="recipe-search-filter-exclude-ingredients">
            <label>Exclude Ingredients</label>
            <Chips value={this.props.filters[this.props.filterTypes.ingredient.exclude]} onChange={this.handleExcludedIngredientsChange} suggestions={this.props.pantryIngredients}
              theme={theme} fromSuggestionsOnly={true} uniqueChips={true} renderChip={value => <Chip theme={chipTheme}>{value}</Chip>}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default RecipeSearchFilter;
