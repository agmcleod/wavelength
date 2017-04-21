import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import childPropValidation from '../../utils/child_prop_validation';

export function Button (props) {
  const classes = classNames(styles.button, props.className, {
    [styles.disabled]: props.disabled
  });
  return (
    <button type={props.type} className={classes} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

Button.displayName = 'Button';

Button.propTypes = {
  children: childPropValidation(),
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string
};

Button.defaultProps = {
  type: 'button'
};

export function DangerButton (props) {
  return (
    <Button type={props.type} className={classNames(styles.danger, props.className)} onClick={props.onClick}>
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

export function UtilityButton (props) {
  return (
    <Button type={props.type} className={styles.utility} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

UtilityButton.propTypes = {
  children: childPropValidation(),
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string
};
