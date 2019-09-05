import React from 'react';
import PropTypes from 'prop-types';

export default function Raw({
  query,
  queryVariables,
}) {
  return (
    <div className="response">
      <h3>Raw Query Data</h3>
      <pre>
        {query}
      </pre>
      <h3>Query Variables</h3>
      <pre>
        {JSON.stringify(queryVariables, null, 4)}
      </pre>
    </div>
  );
}

Raw.propTypes = {
  query: PropTypes.string.isRequired,
  queryVariables: PropTypes.object,
};
