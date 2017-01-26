import React from 'react';

export default function AddFile (props) {
  return (
    <li>
      <input type='file' onChange={(e) => {
        props.onAddFile(e.target.files[0].path);
      }} />
      <button type='button' onClick={props.onRemoveFileField}>Remove</button>
    </li>
  );
}

AddFile.propTypes = {
  onAddFile: React.PropTypes.func.isRequired,
  onRemoveFileField: React.PropTypes.func.isRequired
};

AddFile.displayName = 'AddFile';
