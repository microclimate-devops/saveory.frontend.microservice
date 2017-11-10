import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'carbon-components-react';
import CarbonButton from './carbon/CarbonButton.js';
import MakeRecipeFirstStep from './MakeRecipeFirstStep';

/**
 * Guides the user through a set of steps to update their pantry based on ingredients they used in a recipe
 * Displays a button to open a modal guide
 */
class MakeRecipe extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal: {
        open: false,
        primaryButtonDisabled: true
      },
      currentStep: 1,
      selectedIngredients: {},
    }
    this.addSelectedIngredient = this.addSelectedIngredient.bind(this);
    this.removeDeselectedIngredient = this.removeDeselectedIngredient.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleStepAction = this.handleStepAction.bind(this);
    this.handleSecondaryStepAction = this.handleSecondaryStepAction.bind(this);
  }

  static propTypes = {
    recipeIngredients: PropTypes.array.isRequired,
    matchingPantryIngredients: PropTypes.array.isRequired
  };

  addSelectedIngredient(id){
    let selectedIngredients = this.state.selectedIngredients;
    selectedIngredients[id] = {};
    this.setState({selectedIngredients: selectedIngredients});
  }

  removeDeselectedIngredient(id){
    let selectedIngredients = this.state.selectedIngredients;
    delete selectedIngredients[id];
    this.setState({selectedIngredients:selectedIngredients});
  }

  setModalProp(key, val){
    let modal = this.state.modal;
    modal[key] = val;
    this.setState({modal: modal});
  }

  openModal(e){
    this.setModalProp("open", true);
  }

  closeModal(e){
    this.setModalProp("open", false);
  }

  handleStepAction(e){
    //Go to next step or submit updates
  }

  handleSecondaryStepAction(e){
    //Go to previous step or close modal
  }

  getCurrentStepInfo(){
    let stepInfo = {}
    let stepView = null;
    let stepDesc = "";
    let nextButtonDesc = "";
    let prevButtonDesc = "";
    switch(this.state.currentStep){
      case 1:
        stepView = <MakeRecipeFirstStep  matchingIngredients={this.props.matchingPantryIngredients} selectedIngredients={this.state.selectedIngredients} addIngredient={this.addSelectedIngredient} removeIngredient={this.removeDeselectedIngredient}/>
        stepDesc = "Step 1";
        prevButtonDesc = "Close";
        nextButtonDesc = "Next Step";
        break;
      case 2:
        //stepView = <MakeRecipeSecondStep selectedIngredients={this.state.selectedIngredients} />
        stepDesc = "Step 2";
        prevButtonDesc = "Back";
        nextButtonDesc = "Complete";
        break;
      default:
        break;
    }
    stepInfo.view = stepView;
    stepInfo.description = stepDesc;
    stepInfo.prevButtonDesc = prevButtonDesc;
    stepInfo.nextButtonDesc = nextButtonDesc
    return stepInfo;
  }

  showModal(){
    const currStepInfo = this.getCurrentStepInfo();
    const modalSettings = this.state.modal;
    let modalProps = {
      className: "make-recipe-modal",
      onRequestClose: this.closeModal,
      modalLabel: "Update Your Pantry",
      modalHeading: currStepInfo.description,
      open: modalSettings.open,
      onKeyDown: this.handleKeyDown,
      primaryButtonDisabled: modalSettings.primaryButtonDisabled,
      primaryButtonText: currStepInfo.nextButtonDesc,
      secondaryButtonText: currStepInfo.prevButtonDesc,
      onRequestSubmit: this.handleStepAction,
      onSecondarySubmit: this.handleSecondaryStepAction
    };

    return (
      <Modal {...modalProps}>
        {currStepInfo.view}
      </Modal>
    );

  }

  render(){
    return (
        <div className="make-recipe-modal-container">
          <CarbonButton text="Update My Pantry" addedClass="make-recipe-modal-trigger" onClick={this.openModal} />
          {this.showModal()}
        </div>
    );
  }
}

export default MakeRecipe;
