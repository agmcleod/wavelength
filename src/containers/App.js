import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import AddFile from '../components/add_file';
import { Button } from '../components/button';
import Flash from '../components/flash';

export class App extends Component {
  static propTypes = {
    downloading: React.PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      files: [''],
      formats: [],
      errorMessage: null,
      successMessage: null
    };

    this.onAddFileField = this.onAddFileField.bind(this);
    this.onConvert = this.onConvert.bind(this);
  }

  componentDidMount () {
    // electron.ipcRenderer.on('downloaded', (event, message) => {
    //   if (message) {
    //     this.setState({ downloading: false });
    //   }
    // });

    // electron.ipcRenderer.on('save-error', (event, message) => {
    //   this.setState({ errorMessage: message, successMessage: null });
    // });

    // electron.ipcRenderer.on('save-succeeded', (event, message) => {
    //   this.setState({ errorMessage: null, successMessage: message });
    // });
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
    // electron.ipcRenderer.send('convert-files', {
    //   files: this.state.files, formats: this.state.formats
    // });
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

    return (
      <ul className={styles.list}>
        {formats.map((format, i) => {
          return (
            <li key={i}>
              <input
                className={styles.formatCb}
                type='checkbox' id={format}
                onChange={(e) => this.onToggleFormat(e, format)} />
              <label htmlFor={format}>{format.toUpperCase()}</label>
            </li>
          );
        })}
      </ul>
    );
  }

  renderForm () {
    return (
      <form onSubmit={this.onConvert}>
        {this.renderFormats()}
        <ul className={styles.list}>
          {this.getAddFileFields()}
        </ul>

        <p><Button type='button' onClick={this.onAddFileField} className={styles.addAnotherFile}>Add another file</Button></p>
        <p><Button type='submit'>Convert</Button></p>
      </form>
    );
  }

  render () {
    return (
      <div>
        <div className={styles.appHeader}>
          {this.state.errorMessage ? <Flash type='error' message={this.state.errorMessage} /> : null}
          {this.state.successMessage ? <Flash type='success' message={this.state.successMessage} /> : null}
          <h2>Wavelength - audio converter</h2>
        </div>
        <div className={styles.body}>
          {this.props.downloading ? this.renderDownloading() : this.renderForm()}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    downloading: state.ffmpegReducer.downloading
  };
})(App);
