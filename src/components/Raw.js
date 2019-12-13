import React from 'react';

export default function Raw({
  query,
  queryVariables,
}) {
  return (
    <div className="response">
      <h3>Raw Query Data</h3>
      <pre><code>{query}</code></pre>

      <h3>Query Variables</h3>
      <pre>
        {JSON.stringify(queryVariables, null, 4)}
      </pre>
    </div>
  );
}

Raw.propTypes = {
  query: React.PropTypes.string.isRequired,
  queryVariables: React.PropTypes.object,
};
