import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, InlineNotification} from 'carbon-components-react';
import Client from './Client.js';
import AccountSettingsForm from './AccountSettingsForm';

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

  static PropTypes = {
    userData: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUserUpdate: PropTypes.func
  }

  static defaultProps = {
    open: false
  }

  setNotification(show, type, title, subtitle){
    let notification = this.state.notification;
    notification.show = show;
    notification.type = type;
    notification.title = title;
    notification.subtitle = subtitle;
    this.setState({notification: notification});
  }

  notifyError(title, subtitle){
    this.setNotification(true, 'error', title, subtitle);
  }

  notifySuccess(title, subtitle){
    this.setNotification(true, 'success', title, subtitle);
  }

  errorHandler(e){
      this.notifyError("Error", "Request could not complete.\n"+e.name+": "+e.message);
  }

  clearInputs(){
    let inputsData = this.state.inputsData;
    for(var key in inputsData){
      inputsData[key] = "";
    }
    console.log("inputs after clear");
    console.log(inputsData);
    this.setState({inputsData: inputsData});
  }

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

  requestUserData(){
    Client.request(this.state.userResource+this.props.userData.token, "GET", this.props.onUserUpdate, this.errorHandler);
  }

  handleKeyDown(e){
    //Call onClose if esc was pressed
    if (e.which === 27) {
      this.props.onClose();
    }
  }

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

  inputsAreValid(validateInputs){
    for(var valid in validateInputs){
      if(validateInputs[valid] === false){
        return false;
      }
    }
    return true;
  }

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

  showNotification(){
    const notification = this.state.notification;
    if(notification !== undefined && notification.show){
      return <InlineNotification kind={notification.type} title={notification.title} subtitle={notification.subtitle} role="alert"/>;
    }
  }

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
