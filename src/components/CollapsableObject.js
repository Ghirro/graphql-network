import React from 'react';
import Value from './Value';
import PropTypes from 'prop-types';

export default class CollapsableObject extends React.Component {
  static propTypes = {
    topLevel: PropTypes.bool,
    object: PropTypes.object.isRequired,
    open: PropTypes.bool,
    requestOpen: PropTypes.func,
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
    const { topLevel, object, open } = this.props;
    const { openChildren } = this.state;

    return (
      <div className={`collapsableObject ${topLevel && 'topLevel'}`}>
        {open && (
          <div>
            <span className="openAngleBracket" onClick={this.props.requestOpen}>{'{'}</span>
            <div className="collapsableObjectInternal">
              {Object.keys(object).map((key, i) => {
                return (
                  <div className="property" key={`${key}-${i}`}>
                    <div className="field" onClick={this.props.requestOpen}>
                      {key}
                    </div>
                    <div className="value">
                      <Value
                        value={object[key]}
                        openChildren={openChildren}
                        requestOpen={this.openIsRequested}
                        field={key}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="openAngleBracket lastBrace" onClick={this.props.requestOpen}>{'}'}</span>
          </div>
        )}
        {!open && (
          <div className="property">
            <div className="field" onClick={this.props.requestOpen}>
              <span className="closedAngleBrackets">{'{'}</span>
              <span className="closedObject">{Object.keys(object).join(', ')}</span>
              <span className="closedAngleBrackets lastBrace">{'}'}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
