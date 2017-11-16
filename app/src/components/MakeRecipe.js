import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'carbon-components-react';
import CarbonButton from './carbon/CarbonButton.js';
import Client from './Client.js';
import MakeRecipeFirstStep from './MakeRecipeFirstStep';
import MakeRecipeSecondStep from './MakeRecipeSecondStep';
import MakeRecipeThirdStep from './MakeRecipeThirdStep';

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
      lastStep: 3,
      unitOptions: [],
      selectedIngredients: {},
      currentIngredients: {},
      manuallyUpdatedIngredients: undefined
    }
    this.addSelectedIngredient = this.addSelectedIngredient.bind(this);
    this.removeDeselectedIngredient = this.removeDeselectedIngredient.bind(this);
    this.updateSelectedIngredient = this.updateSelectedIngredient.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.updateManuallyUpdatedIngredient = this.updateManuallyUpdatedIngredient.bind(this);
    this.sendIngredientUpdate = this.sendIngredientUpdate.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleStepAction = this.handleStepAction.bind(this);
    this.handleSecondaryStepAction = this.handleSecondaryStepAction.bind(this);
  }

  static propTypes = {
    userToken: PropTypes.string.isRequired,
    recipeIngredients: PropTypes.array.isRequired,
    matchingPantryIngredients: PropTypes.array.isRequired,
    pantryServiceURL: PropTypes.string.isRequired
  };

  componentDidMount(){
    this.getUnitOptions();
  }

  getUnitOptions(){
    const reqURL = this.props.pantryServiceURL + "spec/ingredient/units";
    Client.request(reqURL, "GET",
      (resp) => {
        this.setState({unitOptions: resp});
      },
      (e) => {
        console.log("GET to "+reqURL+" failed with message: "+e.message);
      });
  }

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

  updateIngredientData(targetKey, id, field, data){
    let target = {};
    target[targetKey] = this.state[targetKey];
    target[targetKey][id][field] = data;

    //check if both quantity and unit are present
    if(target[targetKey][id].quantity && target[targetKey][id].unit){
      target[targetKey][id].valid = true;
    }

    this.setState(target);
  }

  updateSelectedIngredient(id, field, data){
    this.updateIngredientData("selectedIngredients", id, field, data);
  }

  setIngredients(failedIngredients){
    let manuallyUpdatedIngredients = {};
    let currentIngredients = {};
    let ingredient = undefined;
    for(var i in failedIngredients){
      ingredient = failedIngredients[i];
      currentIngredients[ingredient.ingredient] = ingredient
      manuallyUpdatedIngredients[ingredient.ingredient] = {};
    }
    this.setState({manuallyUpdatedIngredients: manuallyUpdatedIngredients, currentIngredients: currentIngredients});
  }

  updateManuallyUpdatedIngredient(id, field, data){
    this.updateIngredientData("manuallyUpdatedIngredients", id, field, data);
  }

  prepareUpdateBody(ingredients){
    //Don't alias ingredients
    let ingredientData = JSON.parse(JSON.stringify(ingredients));
    let sendIngredients = [];
    for(var key in ingredientData){
      ingredientData[key].ingredient = key;
      delete ingredientData[key].valid;
      sendIngredients.push(ingredientData[key]);
    }
    return sendIngredients;
  }

  sendIngredientUpdate(updateType, ingredientData){
    const resourceURL = this.props.pantryServiceURL + this.props.userToken + "/ingredients/" + updateType;
    Client.request(resourceURL, "PUT",
      (resp) => {
        console.log("update resp");
        console.log(resp);
        this.setIngredients(resp.failed);
      },
      (e) => {
        console.log("failed to "+updateType+" update ingredients. Error Message: "+e.message);
        console.log(e.stack);
      },
      this.prepareUpdateBody(ingredientData));
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
    this.setState({selectedIngredients: {}});
  }

  handleStepAction(e){
    //Go to next step or submit updates
    const manuallyUpdatedIngredients = this.state.manuallyUpdatedIngredients;
    const lastStep = this.state.lastStep;
    let nextStep = this.state.currentStep + 1;

    //If we are past the last step, we can close down the modal
    if(nextStep > lastStep){
        if(Object.keys(manuallyUpdatedIngredients).length > 0){
          this.sendIngredientUpdate("manual", manuallyUpdatedIngredients);
          this.completeSteps();
          nextStep = 1;
        }
    }
    else if(nextStep === lastStep){
      //attempt to auto update the ingredients
      this.sendIngredientUpdate("auto", this.state.selectedIngredients);
    }
    this.setState({currentStep: nextStep});
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

  validateIngredientData(targetKey){
    const target = this.state[targetKey];
    for(var key in target){
      if(target[key].valid === undefined || target[key].valid === false){
        return false;
      }
    }
    return true;
  }

  //check completeness
  validateSecondStep(){
    return this.validateIngredientData("selectedIngredients");
  }

  validateThirdStep(){
    return this.validateIngredientData("manuallyUpdatedIngredients");
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
        stepDesc = "Which ingredients did you use making the recipe?";
        prevButtonDesc = "Close";
        nextButtonDesc = "Next Step";
        stepIsValid = this.validateFirstStep(selectedIngredients);
        break;
      case 2:
        stepView = <MakeRecipeSecondStep selectedIngredients={this.state.selectedIngredients} onIngredientUpdate={this.updateSelectedIngredient} unitOptions={this.state.unitOptions}/>
        stepDesc = "How much of each ingredient did you use?";
        prevButtonDesc = "Back";
        nextButtonDesc = "Next Step";
        stepIsValid = this.validateSecondStep();
        break;
      case 3:
        stepView = <MakeRecipeThirdStep currentIngredients={this.state.currentIngredients} selectedIngredients={this.state.selectedIngredients} manuallyUpdatedIngredients={this.state.manuallyUpdatedIngredients} onIngredientUpdate={this.updateManuallyUpdatedIngredient} unitOptions={this.state.unitOptions}/>
        stepDesc = "Please specify the amount that is left for the remaining ingredients.";
        prevButtonDesc = "Back";
        nextButtonDesc = "Complete";
        stepIsValid = this.validateThirdStep();
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
