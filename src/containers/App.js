import React, { Component } from 'react';
import styles from './App.css';
import AddFile from '../components/add_file/';
import ffDownload from '../ffdownload';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      files: {},
      fileCount: 1
    };

    this.onAddFileField = this.onAddFileField.bind(this);
  }

  componentDidMount () {
    console.time('download');
    ffDownload(() => {
      console.timeEnd('download');
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

  render () {
    return (
      <div>
        <div className={styles.appHeader}>
          <h2>Wavelength - audio converter</h2>
        </div>
        <form onSubmit={this.onConvert}>
          <ul className={styles.list}>
            {this.getAddFileFields()}
          </ul>

          <p><button type='button' onClick={this.onAddFileField}>Add another file</button></p>
        </form>
      </div>
    );
  }
}

export default App;
