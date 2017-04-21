import React from 'react';
import { DangerButton } from '../button';
import styles from './index.css';

function getFileName (currentPath) {
  if (!currentPath) {
    return 'Choose a File';
  }

  const dirs = currentPath.split(/\\\\|\//);
  return dirs[dirs.length - 1];
}

export default function AddFile (props) {
  const fieldName = `add_file_field_${props.index}`;
  return (
    <li className={styles.container}>
      <input type='file' id={fieldName} onChange={(e) => {
        props.onAddFile(e.target.files[0].path);
      }} className={styles.file} />
      <label htmlFor={fieldName}>{getFileName(props.currentPath)}</label>
      <DangerButton onClick={props.onRemoveFileField} className={styles.removeButton}>Remove</DangerButton>
    </li>
  );
}

AddFile.propTypes = {
  currentPath: React.PropTypes.string,
  index: React.PropTypes.number,
  onAddFile: React.PropTypes.func.isRequired,
  onRemoveFileField: React.PropTypes.func.isRequired
};

AddFile.displayName = 'AddFile';
