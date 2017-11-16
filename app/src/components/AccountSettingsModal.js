import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, InlineNotification} from 'carbon-components-react';
import Client from './Client.js';
import AccountSettingsForm from './AccountSettingsForm';

/**
 * Manages Showing and updating account settings in a popup modal
 */
class AccountSettingsModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      userResource: "/api/users/",
      inputsData: {},
      validateInputs: {},
      updateIsValid: false,
      notification: {
        show: false,
        type: "",
        title: "",
        subtitle: ""
      }
    };
    this.errorHandler = this.errorHandler.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
    this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //*********************************************//
  // STATIC DATA & METHODS
  //**********************************************//

  static propTypes = {
    userData: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUserUpdate: PropTypes.func
  }

  static defaultProps = {
    open: false
  }

  //*********************************************//
	// STATE CHANGERS
	//**********************************************//

  /**
   * Update the notification data held in the state
   * @param {boolean} show-determines whether or not to show the notification
   * @param {string} type-the type of notification
   * @param {string} title
   * @param {string} subtitle
   * @stateUsed {this.state.notification}
   * @calls {this.setState}
   */
  setNotification(show, type, title, subtitle){
    let notification = this.state.notification;
    notification.show = show;
    notification.type = type;
    notification.title = title;
    notification.subtitle = subtitle;
    this.setState({notification: notification});
  }

  /**
   * Sets the notification to be an error message
   * @param {string} title
   * @param {string} subtitle
   * @calls {this.setNotification}
   */
  notifyError(title, subtitle){
    this.setNotification(true, 'error', title, subtitle);
  }

  /**
   * Sets the notification to be a success message
   * @param {string} title
   * @param {string} subtitle
   * @calls {this.setNotification}
   */
  notifySuccess(title, subtitle){
    this.setNotification(true, 'success', title, subtitle);
  }

  /**
   * Wipes the inputs for account settings form
   * @stateUsed {this.state.inputsData}
   * @calls {this.setState}
   */
  clearInputs(){
    let inputsData = this.state.inputsData;
    for(var key in inputsData){
      inputsData[key] = "";
    }
    this.setState({inputsData: inputsData});
  }

  //*********************************************//
  // NETWORKING
  //**********************************************//

  /**
   * Setup error notification if request fails
   * @param {Error} e
   * @calls {this.notifyError}
   */
  errorHandler(e){
      this.notifyError("Error", "Request could not complete.\n"+e.name+": "+e.message);
  }

  /**
   * Handle response from update request
   * @param {Object} resp
   * @calls {this.requestUserData, this.clearInputs, this.notifySuccess, this.notifyError}
   */
  updateCallback(resp){
      if(resp.token){
        //Request new user data
        this.requestUserData();
        this.clearInputs();
        this.notifySuccess("Success", "Account updated");
      }else{
        this.notifyError("error", "The update response did not contain a token");
      }
  }

  /**
   * Prepares to send updated data by removing empty or unecessary fields
   * @param {Object} data-entered input data
   * @calls {deleteKeys.push}
   */
  stripUpdateData(data){
    //Figure out the keys of the data to remove
    let deleteKeys = [];
    for(var key in data){
      if(data[key].length === 0 || key === "verifyPassword"){
        deleteKeys.push(key);
      }
    }

    //delete fields from object
    deleteKeys.forEach((key) => {delete data[key]});

    return data;
  }

  /**
   * Sends request to update user's data
   * @param {DOM event} e
   * @propsUsed {this.props.userData}
   * @stateUsed {this.state.inputsData, this.state.userResource}
   * @calls {this.stripUpdateData, JSON.parse, JSON.stringify, Object.keys, Client.request, this.notifyError}
   */
  handleAccountUpdate(e){
    //send all entered data except verifyPassword and empty fields
    let sendData = this.stripUpdateData(JSON.parse(JSON.stringify(this.state.inputsData)));

    if(sendData !== undefined && Object.keys(sendData).length > 0){
      //request update with data
      Client.request(this.state.userResource+this.props.userData.token, "PUT", this.updateCallback, this.errorHandler, sendData);
    }else{
      this.notifyError("Error", "Nothing to update");
    }
  }

  /**
   * Sends request to get the user's data
   * @propsUsed {this.props.userData, this.props.onUserUpdate}
   * @stateUsed {this.state.userResource}
   * @calls {Client.request}
   */
  requestUserData(){
    Client.request(this.state.userResource+this.props.userData.token, "GET", this.props.onUserUpdate, this.errorHandler);
  }

  //*********************************************//
	// ACTION HANDLERS
	//**********************************************//

  /**
   * Is called when the keyboard is pressed, exits modal if ESC key is pressed
   * @param {param_type} e-
   * @propsUsed {this.props.onClose}
   * @calls {this.props.onClose}
   */
  handleKeyDown(e){
    //Call onClose if esc was pressed
    if (e.which === 27 && this.props.open) {
      this.props.onClose();
    }
  }

  /**
   * Makes sure input is valid, makes sure the new password fields have the same data
   * @param {object} inputsData-All the data the user has inputed
   * @param {string} field-The input field
   * @param {string} fieldData-the inputed data
   * @stateUsed {this.state.validateInputs}
   * @return {object} - input validation data
   */
  validateInputChange(inputsData, field, fieldData){
    let validateInputs = this.state.validateInputs;
    if(field === "password"){
      validateInputs["verifyPassword"] = fieldData === inputsData["verifyPassword"];
    }
    else if(field === "verifyPassword"){
        validateInputs[field] = fieldData === inputsData["password"];
    }
    return validateInputs;
  }

  /**
   * Checks to make sure all entries in validate data are true
   * @param {object} validateInputs
   * @return {boolean} -
   */
  inputsAreValid(validateInputs){
    for(var valid in validateInputs){
      if(validateInputs[valid] === false){
        return false;
      }
    }
    return true;
  }

  /**
   * Updates state to match new input and validates data
   * @param {string} inputId-The ID of the input that changed
   * @param {DOM event.target} target-The target input
   * @stateUsed {this.state.inputsData}
   * @calls {this.validateInputChange, this.inputsAreValid, this.setState}
   */
  handleInputChange(inputId, target){
    const field = inputId;
    const fieldData = target.value;

    //Update state to keep new data
    let inputsData = this.state.inputsData;
    inputsData[field] = fieldData;

    //Check validity
    const validateInputs = this.validateInputChange(inputsData, field, fieldData);
    const updateIsValid = this.inputsAreValid(validateInputs);
    this.setState({inputsData: inputsData, validateInputs: validateInputs, updateIsValid: updateIsValid});
  }

  /**
   * Displays the notification if necessary
   * @stateUsed {this.state.notification}
   * @return {JSX(InlineNotification)} - or null
   */
  showNotification(){
    const notification = this.state.notification;
    if(notification !== undefined && notification.show){
      return <InlineNotification kind={notification.type} title={notification.title} subtitle={notification.subtitle} role="alert"/>;
    }
  }

    /**
     * Sets up the account settings modal
     * @propsUsed {this.props.onClose, this.props.open, this.props.onClose, this.props.userData}
     * @stateUsed {this.state.updateIsValid, this.state.inputsData, this.state.validateInputs}
     * @calls {this.showNotification}
     * @return {JSX} -
     */
  render(){
    return (
      <Modal className="account-settings-modal" onRequestClose={this.props.onClose} modalLabel="Change Account Settings" modalHeading="Enter Updates"  secondaryButtonText="Close" primaryButtonText="Save"
        open={this.props.open} onRequestSubmit={this.handleAccountUpdate} onKeyDown={this.handleKeyDown} primaryButtonDisabled={!this.state.updateIsValid} onSecondarySubmit={this.props.onClose}>
        <AccountSettingsForm userData={this.props.userData} inputsData={this.state.inputsData} onChange={this.handleInputChange} validateInputs={this.state.validateInputs}/>
        {this.showNotification()}
      </Modal>
    );
  }
}

export default AccountSettingsModal;
