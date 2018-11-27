import React from 'react';
import CollapsableObject from './CollapsableObject';

export default function Response({
  responseBody,
  response,
}) {
  return (
    <div className="response">
      <h3>Response</h3>
      <h4>Status</h4>
      <p>{response.status}{response.statusText && (': ' + response.statusText)}</p>
      <h4>Body</h4>
      {responseBody != null ? (
        <div className="responseJson">
          <CollapsableObject
            object={responseBody}
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
