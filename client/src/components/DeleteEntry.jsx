import React from 'react';
import { Button } from 'semantic-ui-react';
import Popup from "reactjs-popup";
import { DELETE_BOOTCAMPER } from '../queries';
// import 'semantic-ui-css/semantic.min.css';

class DeleteEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleUsernameChange = e => {
    this.setState({ delete_username: e.target.value });
  }
  onClick = e => {
    console.log("To add entry");
    // const cd = this.objectToCSV(this.state.data);
    // this.download(cd);
  };
  onSubmit = e => {
      console.log(this.props.auth, this.state.delete_username);
      DELETE_BOOTCAMPER(this.state.delete_username)
  }
  render() {
    return (
      <div>
        <div>
          <Popup trigger={<div style={{ float: 'left', backgroundColor: 'transparent', border: 'none' }}><Button floated='left' onClick={this.onClick}>
            Delete entry
          </Button></div>} position="right center">
              <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="username" onChange={this.handleUsernameChange} />
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

export default DeleteEntry;
