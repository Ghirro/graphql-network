import React from 'react';
import Value from './Value';
import PropTypes from 'prop-types';

export default class CollapsableArray extends React.Component {
  static propTypes = {
    arr: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { arr } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="collapsableArray">
        {!isOpen && (
          <div className="closedBrackets closedArray" onClick={this.toggleOpen}>[{arr.length > 0 ? '...' : ''}]</div>
        )}
        {isOpen && (
          <span>
            <span className="openBracket" onClick={this.toggleOpen}>[</span>
              <div className="collapsableArrayInternal">
                {arr.map((x, i) => (
                  <span key={`array-inner-${x}-${i}`}><Value value={x} index={i} {...this.props} /></span>
                ))}
              </div>
            <span className="openBracket finalBracket" onClick={this.toggleOpen}>]</span>
          </span>
        )}
      </div>
    );
  }
}

CollapsableArray.propTypes = {
  arr: PropTypes.array.isRequired,
};
