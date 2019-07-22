import React from 'react';
import Request from './Request';
import PropTypes from 'prop-types';

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
          return <Request key={`request-${i}`} request={request} />;
        }
      })}
      {!entry.data && (
        <p className="error">{entry}</p>
      )}
    </div>
  );
}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
