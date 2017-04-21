import React from 'react';
import styles from './index.css';

export default function Formats (props) {
  const formats = ['flac', 'mp3', 'ogg', 'wav'];
  return (
    <div>
      <h3>Select the formats you wish to convert the files into</h3>
      <ul className={styles.list}>
        {formats.map((format, i) => {
          return (
            <li key={i}>
              <input
                className={styles.formatCb}
                type='checkbox' id={format}
                onChange={(e) => props.onToggleFormat(e, format)} />
              <label htmlFor={format}>{format.toUpperCase()}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Formats.propTypes = {
  onToggleFormat: React.PropTypes.func.isRequired
};
