import React from 'react';
import Request from './Request';

export default function Entry({
  entry,
  onClick,
  isSelected,
  entryOpen
}) {
  return (
    <div className={`entryInner ${isSelected && 'selected'}`} onClick={onClick}>
      <div className={`main status-${entry.response && entry.response.status.toString()[0]}`}>
        {entry.url} <span className="statusCode">{entry.response ? entry.response.status : 'Error'}</span>
      </div>
      {entry.data && entry.data.map((request, i) => {
        if (request.kind !== 'FragmentDefinition') {
          return <Request key={`request-${i}`} request={request} entryOpen={entryOpen} />;
        }
      })}
      {!entry.data && (
        <p className="error">{entry}</p>
      )}
    </div>
  );
}

Entry.propTypes = {
  entry: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  entryOpen: React.PropTypes.bool.isRequired,
};
