import React from 'react';
export default function Header({
  header,
}) {

  return (
    <div className="response">
      <h3>Header</h3>
      <div className="responseJson">
      <pre>
        {JSON.stringify(header, null, 4)}
      </pre>
      </div>
    </div>
  );
}

Header.propTypes = {
  header: React.PropTypes.string.isRequired,
};
