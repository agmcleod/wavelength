import React from 'react';

export default function () {
  return React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.element),
    React.PropTypes.string,
    React.PropTypes.object
  ]);
}
