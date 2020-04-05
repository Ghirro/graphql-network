import React from 'react';

const quickDisplayParams = (x) => {
  if (!x) return 'None';
  return x.map(y => `${y.name} = ${y.value}`).join(', ');
};

const quickDisplayFields = (x) => {
  if (!x) return 'None';
  return x.map(y => `${y.name}`).join(', ');
};

function Operation({
  operation,
}) {
  const { name, fields, params } = operation;

  return (
    <div className="operation">
      <p className="name">{`${name}`}</p>
      <p className="params">{quickDisplayParams(params)}</p>
      <p className="fields">{quickDisplayFields(fields)}</p>
    </div>
  );
}

Operation.propTypes = {
  operation: React.PropTypes.object.isRequired,
};


export default function Definition({
  request,
}) {
  const { name, operations } = request;
  return (
    <div className={'request'}>
      <span>{`- ${name}`}</span>
      {operations.map(x => (
        <Operation operation={x} />
      ))}
    </div>
  );
}

Definition.propTypes = {
  request: React.PropTypes.object.isRequired,
};
