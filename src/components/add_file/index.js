import React from 'react';
import { DangerButton } from '../button';

export default function AddFile (props) {
  return (
    <li>
      <input type='file' onChange={(e) => {
        props.onAddFile(e.target.files[0].path);
      }} />
      <DangerButton onClick={props.onRemoveFileField}>Remove</DangerButton>
    </li>
  );
}

AddFile.propTypes = {
  onAddFile: React.PropTypes.func.isRequired,
  onRemoveFileField: React.PropTypes.func.isRequired
};

AddFile.displayName = 'AddFile';
