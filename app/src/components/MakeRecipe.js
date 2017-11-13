import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'carbon-components-react';
import CarbonButton from './carbon/CarbonButton.js';
import MakeRecipeFirstStep from './MakeRecipeFirstStep';
import MakeRecipeSecondStep from './MakeRecipeSecondStep';

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
      lastStep: 2,
      selectedIngredients: {},
    }
    this.addSelectedIngredient = this.addSelectedIngredient.bind(this);
    this.removeDeselectedIngredient = this.removeDeselectedIngredient.bind(this);
    this.updateSelectedIngredientQuantity = this.updateSelectedIngredientQuantity.bind(this);
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

  updateSelectedIngredientQuantity(id, field, data){
    let selectedIngredients = this.state.selectedIngredients;
    selectedIngredients[id][field] = data;

    //check if both quantity and unit are present
    if(selectedIngredients[id].quantity && selectedIngredients[id].unit){
      selectedIngredients[id].valid = true;
    }

    this.setState({selectedIngredients: selectedIngredients});
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

  completeSteps(){
    //Close modal and reset selections
    this.closeModal();
    this.setState({selectedIngredients: {}, currentStep: 1});
  }

  handleStepAction(e){
    //Go to next step or submit updates
    const lastStep = this.state.lastStep;
    let nextStep = this.state.currentStep + 1;

    //If we are past the last step, we can close down the modal
    if(nextStep > lastStep){
        this.completeSteps();
    }else{
        this.setState({currentStep: nextStep});
    }
  }

  handleSecondaryStepAction(e){
    //Go to previous step or close modal
    let prevStep = this.state.currentStep - 1;

    //close modal if previous step is before the first step
    if(prevStep < 1){
      this.closeModal();
      prevStep = 1;
    }

    this.setState({currentStep: prevStep});
  }

  //Check completeness
  validateFirstStep(selectedIngredients){
    return Object.keys(selectedIngredients).length > 0;
  }

  //check completeness
  validateSecondStep(){
    const selectedIngredients = this.state.selectedIngredients;
    for(var key in selectedIngredients){
      if(selectedIngredients[key].valid === false){
        return false;
      }
    }
    return true;
  }

  getCurrentStepInfo(){
    const selectedIngredients = this.state.selectedIngredients;
    let stepInfo = {}
    let stepView = null;
    let stepDesc = "";
    let nextButtonDesc = "";
    let prevButtonDesc = "";
    let stepIsValid = false;
    switch(this.state.currentStep){
      case 1:
        stepView = <MakeRecipeFirstStep  matchingIngredients={this.props.matchingPantryIngredients} selectedIngredients={selectedIngredients} addIngredient={this.addSelectedIngredient} removeIngredient={this.removeDeselectedIngredient}/>
        stepDesc = "Step 1";
        prevButtonDesc = "Close";
        nextButtonDesc = "Next Step";
        stepIsValid = this.validateFirstStep(selectedIngredients);
        break;
      case 2:
        stepView = <MakeRecipeSecondStep selectedIngredients={this.state.selectedIngredients} onQuantityUpdate={this.updateSelectedIngredientQuantity}/>
        stepDesc = "Step 2";
        prevButtonDesc = "Back";
        nextButtonDesc = "Complete";
        stepIsValid = this.validateSecondStep();
        break;
      default:
        break;
    }
    stepInfo.view = stepView;
    stepInfo.description = stepDesc;
    stepInfo.prevButtonDesc = prevButtonDesc;
    stepInfo.nextButtonDesc = nextButtonDesc;
    stepInfo.valid = stepIsValid;
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
      primaryButtonDisabled: !currStepInfo.valid,
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
