import React from 'react';
import { Button } from 'semantic-ui-react';

/**
 * DownloadCSV BUTTON ~~~ Downloads relevant data
 * State -> data
 */
class DownloadCSV extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  updateStats(data) {
    this.setState({ data: data });
  }

/**
 *  Using some simple string manipulation, we constructed the data that gets inputted
 *  from our tables into this funny method that will format it as a csv file.
 *  We used a blob data type which are file-like objects that can hold raw data.
 */

  objectToCSV(data) {
    const csvRows = [];
    const headers = [];
    for (let headElem in data[0]) {
      const escapedHead = ('' + headElem).replace(/"/g, '\\"');
      headers.push(`"${escapedHead}"`);
    }

    csvRows.push(headers.join(','));
    for (let elem in data) {
      if (elem !== 0) {
        const toAdd = [];
        for (let val in data[elem]) {
          const escaped = ('' + data[elem][val]).replace(/"/g, '\\"');
          toAdd.push(`"${escaped}"`);
        }
        csvRows.push(toAdd.join(','));
      }
    }
    return csvRows.join('\n');
  }

  download(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onClick = e => {
    const cd = this.objectToCSV(this.state.data);
    this.download(cd);
  };

  render() {
    return (
      <div>
        <div>
          <Button floated='right' onClick={this.onClick}>
            Download CSV
          </Button>
        </div>
      </div>
    );
  }
}

export default DownloadCSV;
