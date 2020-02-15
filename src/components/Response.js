import React from 'react';
import CollapsableObject from './CollapsableObject';

export default function Response({
  response,
}) {
  return (
    <div className="response">
      <h3>Response</h3>
      {response != null ? (
        <div className="responseJson">
          <CollapsableObject
            object={response}
            topLevel
            open
          />
        </div>
      ) : (
        <em>empty response body</em>
      )}
    </div>
  );
}

Response.propTypes = {
  response: React.PropTypes.object,
};
