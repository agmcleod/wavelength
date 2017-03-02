import React from 'react';
import styles from './index.css';

export default function Flash (props) {
  return (
    <p className={props.type === 'error' ? styles.error : styles.success}>{props.message}</p>
  );
}

Flash.propTypes = {
  type: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired
};
