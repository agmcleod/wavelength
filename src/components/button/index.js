import React from 'react';
import styles from './index.css';
import childPropValidation from '../../utils/child_prop_validation';

export function Button (props) {
  return (
    <button type={props.type} className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

Button.displayName = 'Button';

Button.propTypes = {
  children: childPropValidation(),
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string
};

Button.defaultProps = {
  className: styles.button,
  type: 'button'
};

export function DangerButton (props) {
  return (
    <Button type={props.type} className={styles.danger} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

DangerButton.propTypes = {
  children: childPropValidation(),
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string
};

DangerButton.defaultProps = {
  type: 'button'
};
