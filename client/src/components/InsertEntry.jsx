import React from 'react';
import { Button } from 'semantic-ui-react';
import Popup from "reactjs-popup";
import { ADD_BOOTCAMPER } from '../queries';

/**
 *  Quite the opposite of our DELETE Component, we have a INSERT Component
 *  Working similarly but not at all, we have a popup that allows you to enter the required fields 
 *  On submit we call an add bootcamper query that will INSERT the user into the db.
 */

class InsertEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
  handleFirstnameChange = e => {
    this.setState({ add_firstname: e.target.value });
  }
  handleLastnameChange = e => {
    this.setState({ add_lastname: e.target.value });
  }
  handleUsernameChange = e => {
    this.setState({ add_username: e.target.value });
  }
  handleEmailChange = e => {
    this.setState({ add_email: e.target.value });
  }
  handleGenderChange = e => {
    this.setState({ add_gender: e.target.value });
  }
  handleCampusChange = e => {
    this.setState({ add_campus: e.target.value });
  }
  handleEthnicityChange = e => {
    this.setState({ add_ethnicity: e.target.value });
  }
  onClick = e => {
    console.log("To add entry");
  };
  onSubmit = e => {
      console.log(this.props.auth, this.state.add_firstname);
      console.log(ADD_BOOTCAMPER(this.state.add_firstname, this.state.add_lastname, this.state.add_username, this.state.add_email, this.state.add_campus, this.state.add_gender, this.state.add_ethnicity, "active"))
  }
  render() {
    return (
      <div>
        <div>
          <Popup trigger={<div style={{ float: 'left', backgroundColor: 'transparent', border: 'none' }}><Button floated='left' onClick={this.onClick}>
            Add entry
          </Button></div>} position="right center">
              <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input className="form-control" id="firstname" onChange={this.handleFirstnameChange} />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input className="form-control" id="lastname" onChange={this.handleLastnameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="username" onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email"
                        placeholder="name@example.com" onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campus">Campus</label>
                        <input className="form-control" id="campus" onChange={this.handleCampusChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <input className="form-control" id="gender" onChange={this.handleGenderChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ehtnicity">Ethnicity</label>
                        <input className="form-control" id="ethnicity" onChange={this.handleEthnicityChange} />
                    </div>
                    <div className="form-group">
                        <button className="form-control btn btn-primary" type="submit">
                        Submit
                        </button>
                    </div>
                </form>
              </div>
          </Popup>  
          
        </div>
      </div>
    );
  }
}

export default InsertEntry;
