import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <h2>Wavelength - audio converter</h2>
        </div>
        <p className={styles.appIntro}>
          Some  text
        </p>
      </div>
    );
  }
}

export default App;
