import React from 'react';
import Collapsable from './Collapsable';
import PropTypes from 'prop-types';

export default function Computed({
  request,
  fragments,
}) {
  const { operations } = request;
  return (
    <div className="computed">
      {operations.map(x => (
        <div className="computed-operation">
          <Collapsable
            closable={false}
            object={x}
            fragments={fragments}
            topLevel
            opened
          />
        </div>
      ))}
    </div>
  );
}

Computed.propTypes = {
  request: PropTypes.object.isRequired,
  fragments: PropTypes.array.isRequired,
};
