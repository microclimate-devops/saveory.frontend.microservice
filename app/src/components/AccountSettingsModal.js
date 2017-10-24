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
      error: {
        show: false,
        msg: "Could not update your account",
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

  setError(show, msg){
    let error = this.state.error;

    //Update data if present
    error.show = show || false;
    if(msg){
      error.msg = msg;
    }
    this.setState({error: error});
  }

  showError(){
    const error = this.state.error;
    if(error.show){
      return <InlineNotification kind="error" title="Error" subtitle={error.msg} role="alert"/>;
    }
  }

  errorHandler(e){
      this.setError(true);
  }

  updateCallback(resp){
      let showError = false;
      let msg = undefined;
      if(resp.token){
        //Request new user data
        this.requestUserData();

        //close the modal
        this.props.onClose();
      }else{
        showError = true;
        msg = "The update response did not contain a token";
      }
      this.setError(showError, msg);
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
      this.setError(true, "Nothing to update");
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
    console.log("validate inputs");
    console.log(validateInputs);
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
    console.log("updateIsValid: "+updateIsValid);
    this.setState({inputsData: inputsData, validateInputs: validateInputs, updateIsValid: updateIsValid});
  }


  render(){
    return (
      <Modal className="account-settings-modal" onRequestClose={this.props.onClose} modalLabel="Change Account Settings" modalHeading="Enter Updates"  secondaryButtonText="Close" primaryButtonText="Save"
        open={this.props.open} onRequestSubmit={this.handleAccountUpdate} onKeyDown={this.handleKeyDown} primaryButtonDisabled={!this.state.updateIsValid} onSecondarySubmit={this.props.onClose}>
        <AccountSettingsForm userData={this.props.userData} inputsData={this.state.inputsData} onChange={this.handleInputChange} validateInputs={this.state.validateInputs}/>
      </Modal>
    );
  }

}

export default AccountSettingsModal;
