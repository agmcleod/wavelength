import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import AddFile from '../components/add_file';
import { Button, UtilityButton } from '../components/button';
import Flash from '../components/flash';
import { requestConvert } from '../reducers/convert';
import Formats from '../components/formats';

export class App extends Component {
  static propTypes = {
    downloading: React.PropTypes.bool.isRequired,
    flashMessage: React.PropTypes.shape({
      type: React.PropTypes.string,
      message: React.PropTypes.string
    }),
    requestConvert: React.PropTypes.func.isRequired,
    submitted: React.PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      files: [''],
      formats: []
    };

    this.onAddFileField = this.onAddFileField.bind(this);
    this.onConvert = this.onConvert.bind(this);
    this.onToggleFormat = this.onToggleFormat.bind(this);
  }

  getAddFileFields () {
    return this.state.files.map((file, i) => {
      return (
        <AddFile key={i} onAddFile={(p) => this.onAddFile(i, p)} index={i} currentPath={this.state.files[i]} onRemoveFileField={() => this.onRemoveFileField(i)} />
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
    this.props.requestConvert(this.state.formats, this.state.files);
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

  renderForm () {
    return (
      <form onSubmit={this.onConvert}>
        <ul className={styles.list}>
          {this.getAddFileFields()}
        </ul>

        <p>
          <UtilityButton
            onClick={this.onAddFileField}
            className={styles.addAnotherFile}>
            Add another file
          </UtilityButton>
        </p>
        {this.state.files[0] !== '' ? <Formats onToggleFormat={this.onToggleFormat} /> : null }
        <p>
          <Button type='submit' disabled={this.props.submitted}>
            {this.props.submitted ? '...' : 'Convert'}
          </Button>
        </p>
      </form>
    );
  }

  render () {
    const flashMessage = this.props.flashMessage;
    return (
      <div>
        <div className={styles.appHeader}>
          {
            this.props.flashMessage.type && this.props.flashMessage.message &&
            <Flash type={flashMessage.type} message={flashMessage.message} />
          }
          <h2>Wavelength</h2>
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
    downloading: state.ffmpegReducer.downloading,
    flashMessage: {
      type: state.flashMessageReducer.type,
      message: state.flashMessageReducer.message
    },
    submitted: state.convertReducer.submitted
  };
}, { requestConvert })(App);
