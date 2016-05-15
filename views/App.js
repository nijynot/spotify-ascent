import React from 'react';
import { Link } from 'react-router';
import { randexp } from 'randexp';
import { encode } from 'querystring';
import { getHashParams } from '../config/hash.js';

import Search from './components/Search.js';
import Results from './components/Results.js';

require('../scss/app.scss');

const stateKey = 'spotify_auth_state';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillMount() {
    if (getHashParams().access_token) {
      this.setState({
        tracks: [],
      });
    }
  }
  handleOnClick() {
    const client_id = '8f2cb7479b9348a68cd962cc7fae7733'; // Your client id
    const redirect_uri = 'http://localhost:1337/'; // Your redirect uri
    const state = randexp(/[a-zA-Z0-9]{16}/);

    localStorage.setItem(stateKey, state);
    const scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  }
  handleOnKeyDown(e) {
    if (e.key === 'Enter' && e.target.value) {
      this.context.router.push(`/?q=${e.target.value}#${encode(getHashParams())}`);
      this.search(e.target.value);
    } else if (e.key === 'Enter' && !e.target.value) {
      this.context.router.push(`/?q=${e.target.value}#${encode(getHashParams())}`);
      this.setState({
        tracks: [],
      });
    }
  }
  reset() {
    if (getHashParams().access_token) {
      this.setState({
        tracks: [],
      });
    }
  }
  search(query) {
    const headers = new Headers({
      Host: 'api.spotify.com',
      Accept: 'application/json',
      Authorization: `Bearer ${getHashParams().access_token}`
    });

    const options = {
      method: 'GET',
      headers,
      mode: 'cors',
      cache: 'default',
    };

    fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, options)
    .then((res) => res.json()
    ).then((value) => {
      this.setState({
        tracks: value.tracks.items,
      });
    });
  }
  render() {
    let loginButton;

    if (!getHashParams().access_token) {
      loginButton = (
        <div className="spotify-button-container">
          <span
            className="spotify-token-button"
            onClick={this.handleOnClick}
          >
          Log in with Spotify!
          </span>
        </div>
      );
    }

    return (
      <div className="content">
        <div className="logo bold">
          <Link
            to={`/spotify-relevant/#${encode(getHashParams())}`}
            onClick={this.reset}
          >
            RELEVANT
          </Link>
        </div>

        <div className="nav">
          <Search
            location={this.props.location}
            search={this.search}
            handleSearchOnKeyDown={this.handleOnKeyDown}
            access_token={getHashParams().access_token}
          />
          <Results
            tracks={this.state.tracks}
          />
        </div>
        {loginButton}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = App;
