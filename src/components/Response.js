import React from 'react';
import CollapsableObject from './CollapsableObject';
import PropTypes from 'prop-types';

export default function Response({
  response,
}) {
  return (
    <div className="response">
      <h3>Response</h3>
      <div className="responseJson">
        <CollapsableObject
          object={response}
          topLevel
          open
        />
      </div>
    </div>
  );
}

Response.propTypes = {
  response: PropTypes.string.isRequired,
};
