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


// TODO: Change this and filename to "Definition"
export default function Request({
  request,
}) {
  const { name, operations } = request;
  return (
    <div className={'request'}>
      <span>{`- ${name}`}</span>
      {operations.map((x, i) => (
        <Operation operation={x} key={`operation-${i}`}/>
      ))}
    </div>
  );
}

Request.propTypes = {
  request: React.PropTypes.object.isRequired,
};
