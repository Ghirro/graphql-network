import React from 'react';
import Entry from './Entry';
import LongInformation from './LongInformation';
import PropTypes from 'prop-types';

import {
  isGraphQL,
  parseEntry,
} from '../lib/utils';

export default class DevToolsPanel extends React.Component {
  static propTypes = {
    requestFinished: PropTypes.object.isRequired,
    getHAR: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.urlPattList = [];
    this.state = {
      data: [],
      entryOpen: false,
      openIndex: null,
      hasError: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console && console.log(error, errorInfo);
  }

  parseLogToState = (log) => {
    if (!isGraphQL(log, this.urlPattList)) return null;
    return parseEntry(log)
      .then(data => {
        this.setState({
          data: [...this.state.data, ...data],
        });
      });
  };

  requestHandler = (request) => {
    this.parseLogToState(request);
  };

  setEntry = (entry, i) => this.setState({ entryOpen: entry, openIndex: i });
  onRequestClose = () => this.setState({ entryOpen: false, openIndex: null });

  clearEntries = () => {
    this.setState({
      data: [],
      entryOpen: false
    });
  }

  componentDidMount() {
    this.props.requestFinished.addListener(this.requestHandler);
    chrome.storage.sync.get('urlPattList', function(data) {
      if(Array.isArray(data.urlPattList)) {
          Object.assign(this.urlPattList, data.urlPattList);
      }
  }.bind(this));
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. <span>{JSON.stringify(this.state.hasError)}</span></h1>;
    }
    const { data, entryOpen } = this.state;
    return (
      <div className="devToolsWrapper">
        <div className={`entryWrapper ${entryOpen && 'shortEntryWrapper'}`}>
        <div>
          <div className="operation header">
            <span className="name">Operation Name</span>
            <span className="params">Params</span>
            <span className="fields">Selection</span>
          </div>
        </div>
        {data.map((entry, i) => {
          return (
            <Entry
              key={`entry-${i}`}
              onClick={() => this.setEntry(entry, i)}
              entry={entry}
              isSelected={entryOpen && entry.id === entryOpen.id}
            />
          );
        })}
        {data.length > 0 &&
          <div className="clearContainer">
            <button onClick={() => this.clearEntries()}>Clear</button>
          </div>
        }
        </div>
        <div className={`displayAreaWrapper ${entryOpen && 'longDisplayAreaWrapper'}`}>
          {entryOpen && (
            <LongInformation
              entry={entryOpen}
              onRequestClose={this.onRequestClose}
            />
          )}
        </div>
      </div>
    );
  }
}
