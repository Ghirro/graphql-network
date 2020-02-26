import React from "react";
import Entry from "./Entry";
import LongInformation from "./LongInformation";

import { isGraphQL, parseEntry } from "../lib/utils";

export default class DevToolsPanel extends React.Component {
  static propTypes = {
    requestFinished: React.PropTypes.object.isRequired,
    getHAR: React.PropTypes.func.isRequired,
    theme: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      entryOpen: false,
      openIndex: null
    };
  }

  parseLogToState = log => {
    if (!isGraphQL(log)) return null;

    return parseEntry(log).then(data => {
      this.setState({
        data: [...this.state.data, ...data]
      });
    });
  };

  requestHandler = request => {
    this.parseLogToState(request);
  };

  setEntry = (entry, i) => this.setState({ entryOpen: entry, openIndex: i });
  onRequestClose = () => this.setState({ entryOpen: false, openIndex: null });

  clearEntries = () => {
    this.setState({
      data: [],
      entryOpen: false
    });
  };

  componentDidMount() {
    this.props.requestFinished.addListener(this.requestHandler);
  }

  render() {
    const { theme = "default" } = this.props;
    const { data, entryOpen } = this.state;
    return (
      <div className={`devToolsWrapper theme-${theme}`}>
        <div className={`entryWrapper ${entryOpen && "shortEntryWrapper"}`}>
          <div>
            <div className="operation header">
              <span className="name">Operation Name</span>
              <span className="params">Params</span>
              <div className="fields">
                <span>Selection</span>
                {data.length > 0 && (
                  <button className="clear" onClick={() => this.clearEntries()}>
                    Clear
                  </button>
                )}
              </div>
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
        </div>
        <div
          className={`displayAreaWrapper ${entryOpen &&
            "longDisplayAreaWrapper"}`}
        >
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
