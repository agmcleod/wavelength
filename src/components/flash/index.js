import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { hideMessage } from '../../reducers/flash_message';
import styles from './index.css';
import { TYPES } from '../../reducers/flash_message';

export function Flash (props) {
  return (
    <div className={classNames(props.type === TYPES.ERROR ? styles.error : styles.success, 'fadeIn')}>
      <p className={styles.message}>{props.message}</p>
      <button className={styles.close} onClick={props.hideMessage}>
        <span>x</span>
      </button>
    </div>
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
