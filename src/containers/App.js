import React, { Component } from 'react';
import styles from './App.css';
import AddFile from '../components/add_file/';
const electron = require('electron');

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      downloading: true,
      files: [''],
      formats: [],
      errorMessage: null,
      successMessage: null
    };

    this.onAddFileField = this.onAddFileField.bind(this);
    this.onConvert = this.onConvert.bind(this);
  }

  componentDidMount () {
    electron.ipcRenderer.on('downloaded', (event, message) => {
      if (message) {
        this.setState({ downloading: false });
      }
    });

    electron.ipcRenderer.on('save-error', (event, message) => {
      this.setState({ errorMessage: message, successMessage: null });
    });

    electron.ipcRenderer.on('save-succeeded', (event, message) => {
      this.setState({ errorMessage: null, successMessage: message });
    });
  }

  getAddFileFields () {
    return this.state.files.map((file, i) => {
      return (
        <AddFile key={i} onAddFile={(p) => this.onAddFile(i, p)} onRemoveFileField={() => this.onRemoveFileField(i)} />
      );
    });
  }

  onAddFile (i, path) {
    const files = this.state.files.slice(0);
    files[i] = path;
    this.setState({ files });
  }

  onAddFileField () {
    this.setState({
      files: this.state.files.concat([''])
    });
  }

  onRemoveFileField (i) {
    const files = this.state.files.slice(0);
    files.splice(i, 1);
    this.setState({ files });
  }

  onConvert (e) {
    e.preventDefault();
    electron.ipcRenderer.send('convert-files', {
      files: this.state.files, formats: this.state.formats
    });
  }

  onToggleFormat (event, format) {
    const formats = this.state.formats.slice(0);
    if (event.target.checked) {
      formats.push(format);
      this.setState({ formats });
    } else {
      this.setState({ formats: formats.filter((f) => f !== format) });
    }
  }

  renderDownloading () {
    return <h3>Downloading ffmpeg</h3>;
  }

  renderFormats () {
    const formats = ['aif', 'flac', 'mp3', 'ogg', 'wav'];

    return formats.map((format, i) => {
      return (
        <div key={i} className={styles.format}>
          <label htmlFor={format}>{format.toUpperCase()}</label>
          <input type='checkbox' id={format} onChange={(e) => this.onToggleFormat(e, format)} />
        </div>
      );
    });
  }

  renderForm () {
    return (
      <form onSubmit={this.onConvert}>
        <div>
          {this.renderFormats()}
        </div>
        <ul className={styles.list}>
          {this.getAddFileFields()}
        </ul>

        <p><button type='button' onClick={this.onAddFileField}>Add another file</button></p>
        <p><input type='submit' value='Convert' /></p>
      </form>
    );
  }

  render () {
    return (
      <div>
        <div className={styles.appHeader}>
          {this.state.errorMessage ? <p className={styles.error}>{this.state.errorMessage}</p> : null}
          {this.state.successMessage ? <p className={styles.success}>{this.state.successMessage}</p> : null}
          <h2>Wavelength - audio converter</h2>
        </div>
        {this.state.downloading ? this.renderDownloading() : this.renderForm()}
      </div>
    );
  }
}

export default App;
