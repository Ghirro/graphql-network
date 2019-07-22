import React from 'react';
import CollapsableArray from './CollapsableArray';
import isPlainObject from 'lodash/isPlainObject';
import CollapsableObject from './CollapsableObject';
import PropTypes from 'prop-types';

// TODO: Check Object.isObject
export default function Value({
  value,
  field,
  kind,
  index,
  requestOpen,
  openChildren,
}) {
  field = index ? `${field}-${index}` : field;

  if (Array.isArray(value)) {
    return (
      <CollapsableArray
        arr={value}
        field={field}
        requestOpen={requestOpen}
        openChildren={openChildren}
      />
    );
  } else if (isPlainObject(value)) {
    return (
      <CollapsableObject
        object={value}
        requestOpen={() => requestOpen(field)}
        open={openChildren.indexOf(field) !== -1}
      />
    );
  } else {
    if (value && value.length > 200) {
      value = `${value.slice(0, 200)}...`;
    }

    if (
      kind === 'ObjectValue' ||
      kind === 'EnumValue' ||
      kind === 'Variable' ||
      typeof value === 'boolean' ||
      typeof value === 'undefined' ||
      typeof value === 'number' ||
      value === null
    ) {
      value = `${value}`;
    } else {
      value = value.charAt && value.charAt(0) === '$' ? `${value}` : `"${value}"`;
    }
    return <div className="value plainValue">{value}</div>;
  }
}

Value.propTypes = {
  value: PropTypes.any.isRequired,
  field: PropTypes.string,
  kind: PropTypes.string,
  index: PropTypes.number,
  requestOpen: PropTypes.func,
  openChildren: PropTypes.array,
};
