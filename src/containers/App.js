import React, { Component } from 'react';
import styles from './App.css';
import AddFile from '../components/add_file/';
const electron = require('electron');

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      downloading: true,
      files: {},
      fileCount: 1
    };

    this.onAddFileField = this.onAddFileField.bind(this);
  }

  componentDidMount () {
    electron.ipcRenderer.on('downloaded', (event, message) => {
      if (message) {
        this.setState({ downloading: false });
      }
    });
  }

  getAddFileFields () {
    const fileFields = [];
    for (let i = 0; i < this.state.fileCount; i++) {
      fileFields.push(
        <AddFile key={i} onAddFile={(p) => this.onAddFile(i, p)} onRemoveFileField={() => this.onRemoveFileField(i)} />
      );
    }

    return fileFields;
  }

  onAddFile (i, path) {
    this.setState({
      files: Object.assign({}, { [i]: path })
    });
  }

  onAddFileField () {
    this.setState({ fileCount: this.state.fileCount + 1 });
  }

  onRemoveFileField (i) {
    const files = Object.assign({}, this.state.files);
    delete files[i];
    this.setState({ files, fileCount: this.state.fileCount - 1 });
  }

  onConvert () {

  }

  renderDownloading () {
    return <h3>Downloading ffmpeg</h3>;
  }

  renderForm () {
    return (
      <form onSubmit={this.onConvert}>
        <ul className={styles.list}>
          {this.getAddFileFields()}
        </ul>

        <p><button type='button' onClick={this.onAddFileField}>Add another file</button></p>
      </form>
    );
  }

  render () {
    return (
      <div>
        <div className={styles.appHeader}>
          <h2>Wavelength - audio converter</h2>
        </div>
        {this.state.downloading ? this.renderDownloading() : this.renderForm()}
      </div>
    );
  }
}

export default App;
