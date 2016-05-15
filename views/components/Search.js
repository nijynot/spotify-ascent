import React from 'react';

require('../../scss/search.scss');

class Search extends React.Component {
  componentDidMount() {
    if (this.props.location.query.q) {
      this.props.search(this.props.location.query.q);
    }
  }
  render() {
    return (
      <div className="search">
        <input
          defaultValue={this.props.location.query.q}
          name="search"
          onKeyDown={this.props.handleSearchOnKeyDown}
          placeholder="Search..."
        />
      </div>
    );
  }
}

Search.propTypes = {
  access_token: React.PropTypes.string,
  location: React.PropTypes.object,
  handleSearchOnKeyDown: React.PropTypes.func,
  search: React.PropTypes.func,
};

module.exports = Search;
