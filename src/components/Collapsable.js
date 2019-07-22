import React from 'react';
import Value from './Value';
import Computed from './Computed';
import PropTypes from 'prop-types';

export default class Collapsable extends React.Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
    topLevel: PropTypes.bool,
    opened: PropTypes.bool,
    requestOpen: PropTypes.func.isRequired,
    fragments: PropTypes.array.isRequired,
    closable: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openChildren: [],
    };
  }

  openIsRequested = (name) => {
    if (this.state.openChildren.indexOf(name) === -1) {
      this.setState({
        openChildren: [
          ...this.state.openChildren,
          name,
        ],
      });
    } else {
      this.setState({
        openChildren: this.state.openChildren.filter(x => x !== name),
      });
    }
  };

  render() {
    const { object, opened, requestOpen, fragments, closable } = this.props;
    const { openChildren } = this.state;

    const fields = object.fields;
    return (
      <div className="collapsable">
        <div className={`nameParamWrapper ${fields && closable && 'hasChildren'} ${opened ? 'opened' : 'closed'}`} onClick={() => requestOpen(object.name)}>
          <p className="name" onClick={() => requestOpen(object.name)}>
            {object.kind !== 'FragmentSpread' && object.name}
            {object.kind === 'FragmentSpread' && (
              <Computed
                request={fragments.filter(x => x.name === object.name)[0]}
                fragments={fragments}
              />
            )}
          </p>
          {object.params && object.params.length > 0 && (
            <div className="params">
              {object.params.map(param => (
                <div className="param">
                  <span className="paramName">{param.name}</span>
                  <Value value={param.value} kind={param.kind} />
                </div>
              ))}
            </div>
          )}
        </div>
        {fields && opened && (
          <div className="fields">
            {fields.map(field => (
              <Collapsable
                closable
                object={field}
                fragments={fragments}
                opened={openChildren.indexOf(field.name) !== -1}
                requestOpen={this.openIsRequested}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
