import React from 'react';
import { Button } from 'semantic-ui-react';
import Popup from "reactjs-popup";
// import 'semantic-ui-css/semantic.min.css';

/**
 * DownloadCSV BUTTON ~~~ Downloads relevant data
 * State -> data
 */
class InsertEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  updateStats(data) {
    this.setState({ data: data });
    // if (data.capetown.male && data.capetown.female && data.johannesburg.male && data.johannesburg.female) { console.log("popop", [data.capetown.male, data.capetown.female, data.johannesburg.male, data.johannesburg.female]); }
  }
//   objectToCSV(data) {
//     const csvRows = [];
//     const headers = [];
//     for (let headElem in data[0]) {
//       const escapedHead = ('' + headElem).replace(/"/g, '\\"');
//       headers.push(`"${escapedHead}"`);
//     }
//     csvRows.push(headers.join(','));
//     for (let elem in data) {
//       if (elem !== 0) {
//         const toAdd = [];
//         for (let val in data[elem]) {
//           const escaped = ('' + data[elem][val]).replace(/"/g, '\\"');
//           toAdd.push(`"${escaped}"`);
//         }
//         csvRows.push(toAdd.join(','));
//       }
//     }
//     return csvRows.join('\n');
//   }
//   download(data) {
//     const blob = new Blob([data], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.setAttribute('hidden', '');
//     a.setAttribute('href', url);
//     a.setAttribute('download', 'download.csv');
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   }
  onClick = e => {
    console.log("To add entry");
    // const cd = this.objectToCSV(this.state.data);
    // this.download(cd);
  };
  onSubmit = e => {
      console.log(this.props.auth);
  }
  render() {
    return (
      <div>
        <div>
          <Popup trigger={<button style={{ float: 'left', backgroundColor: 'transparent', border: 'none' }}><Button floated='left' onClick={this.onClick}>
            Add entry
          </Button></button>} position="right center">
              <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" id="name" />
                    </div> 
                    
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email"
                        placeholder="name@example.com" 
                        />
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
