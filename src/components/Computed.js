import React from 'react';
import Collapsable from './Collapsable';

export default function Computed({
  request,
  fragments,
}) {
  const { operations } = request;
  return (
    <div className="computed">
      {operations.map((x, i) => (
        <div className="computed-operation" key={`computed-operation-${i}`}>
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
  request: React.PropTypes.object.isRequired,
  fragments: React.PropTypes.array.isRequired,
};
