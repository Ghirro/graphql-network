import React from 'react';
import Definition from './Definition';

const makeGraphiQlUrl = (entry) => {
  const base = entry.url;
  const query = encodeURIComponent(entry.bareQuery);
  const variables = encodeURIComponent(JSON.stringify(entry.queryVariables));
  return `${base}/graphiql?query=${query}&variables=${variables}`;
};

export default function Entry({
  entry,
  onClick,
  isSelected,
}) {
  return (
    <div className={`entryInner ${isSelected && 'selected'}`} onClick={onClick}>
      <div className={`main status-${entry.response && entry.response.status.toString()[0]}`}>
        {entry.url} <span className="statusCode">{entry.response ? entry.response.status : 'Error'}</span>
      </div>
      {entry.data && entry.data.map((request, i) => {
        if (request.kind !== 'FragmentDefinition') {
          return <Definition key={`request-${i}`} request={request} />;
        }
      })}
      {!entry.data && (
        <p className="error">{entry}</p>
      )}
      <div className="runInGraphiQl">
        <a target="_blank" href={makeGraphiQlUrl(entry)}>Run in GraphiQL</a>
      </div>
    </div>
  );
}

Entry.propTypes = {
  entry: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};
