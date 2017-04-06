import React from 'react';
import { DangerButton } from '../button';
import styles from './index.css';

export default function AddFile (props) {
  return (
    <li>
      <input type='file' onChange={(e) => {
        props.onAddFile(e.target.files[0].path);
      }} className={styles.file} />
      <label>{props.currentPath ? props.currentPath : 'Choose a File'}</label>
      <DangerButton onClick={props.onRemoveFileField}>Remove</DangerButton>
    </li>
  );
}

AddFile.propTypes = {
  currentPath: React.PropTypes.string,
  onAddFile: React.PropTypes.func.isRequired,
  onRemoveFileField: React.PropTypes.func.isRequired
};

AddFile.displayName = 'AddFile';
