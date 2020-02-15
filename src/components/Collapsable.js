import React from 'react';
import Value from './Value';
import Computed from './Computed';

export default class Collapsable extends React.Component {

  static propTypes = {
    object: React.PropTypes.object.isRequired,
    topLevel: React.PropTypes.bool,
    opened: React.PropTypes.bool,
    requestOpen: React.PropTypes.func,
    fragments: React.PropTypes.array.isRequired,
    closable: React.PropTypes.bool.isRequired,
  };

  static defaultProps = {
    requestOpen: () => {},
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
          <div className="name" onClick={() => requestOpen(object.name)}>
            {object.kind !== 'FragmentSpread' && object.name}
            {object.kind === 'FragmentSpread' && (
              <Computed
                request={fragments.filter(x => x.name === object.name)[0]}
                fragments={fragments}
              />
            )}
          </div>
          {object.params && object.params.length > 0 && (
            <div className="params">
              {object.params.map((param, i) => (
                <div className="param" key={`param-${i}`}>
                  <span className="paramName">{param.name}</span>
                  <Value value={param.value} kind={param.kind} />
                </div>
              ))}
            </div>
          )}
        </div>
        {fields && opened && (
          <div className="fields">
            {fields.map((field, i) => (
              <Collapsable
                closable
                object={field}
                fragments={fragments}
                opened={openChildren.indexOf(field.name) !== -1}
                requestOpen={this.openIsRequested}
                key={`field-${i}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
