import React from 'react';
import { connect } from 'react-redux';
import { hideMessage } from '../../reducers/flash_message';
import styles from './index.css';
import { TYPES } from '../../reducers/flash_message';

export function Flash (props) {
  return (
    <p className={props.type === TYPES.ERROR ? styles.error : styles.success}>
      {props.message}
      <button className={styles.close} onClick={props.hideMessage}>x</button>
    </p>
  );
}

Flash.propTypes = {
  hideMessage: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf([TYPES.ERROR, TYPES.SUCCESS]),
  message: React.PropTypes.string
};

export default connect(() => {
  return {};
}, { hideMessage })(Flash);
