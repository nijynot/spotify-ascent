import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import TransitionGroup from 'react-addons-css-transition-group';
import { getHashParams } from '../../config/hash.js';
import 'whatwg-fetch';

import Seeking from '../components/Seeking.js';

require('../../scss/trackEntryPoint.scss');

const headers = new Headers({
  Host: 'api.spotify.com',
  Accept: 'application/json',
  Authorization: `Bearer ${getHashParams().access_token}`,
});

const options = {
  method: 'GET',
  headers,
  mode: 'cors',
  cache: 'default',
};

class TrackEntryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFeatures: null,
      trackInfo: null,
      track: null,
      playback: false,
      progress: 0,
      words: [],
      showingWords: [],
      fontSize: [],
      x: [],
      y: [],
      z: [],
      hover: false,
    };
    this.goBack = this.goBack.bind(this);
    this.playback = this.playback.bind(this);
  }
  componentDidMount() {
    this.audioFeatures(this.props.params.id);
  }
  componentWillUnmount() {
    this.state.track.stop();
    clearInterval(this.timePoll);
  }
  getWords() {
    fetch(`https://api.spotify.com/v1/search?q=${this.state.trackInfo.artists[0].name}&type=track&offset=0`, options)
    .then((res) => {
      return res.json();
    }).then((value) => {
      const trackNames = [];
      for (let i = 0; i < value.tracks.items.length; i++) {
        trackNames.push(value.tracks.items[i].name);
      }
      this.setState({
        words: this.state.words.concat(trackNames),
      });
    });
    fetch(`https://api.spotify.com/v1/search?q=${this.state.trackInfo.artists[0].name}&type=album&offset=0`, options)
    .then((res) => res.json())
    .then((value) => {
      const albumNames = [];
      for (let i = 0; i < value.albums.items.length; i++) {
        albumNames.push(value.albums.items[i].name);
      }
      this.setState({
        words: this.state.words.concat(albumNames),
      });
    });
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  goBack() {
    this.pause();
    this.context.router.goBack();
  }
  playback() {
    if (this.state.playback) {
      this.pause();
    } else {
      this.play();
      this.showWords = setInterval(() => {
        this.setState({
          showingWords: _.concat(
            this.state.showingWords,
            {
              id: Math.random() * 100000,
              word: _.sample(this.state.words),
              size: this.getRandomInt(18, 54),
              x: this.getRandomInt(10, 90),
              y: this.getRandomInt(10, 90),
              z: this.getRandomInt(1, 20),
            }
          ),
        });
        setTimeout(() => {
          this.setState({
            showingWords: _.slice(this.state.showingWords, 1),
          });
        }, 2500);
      }, (this.state.audioFeatures.tempo / 60 * 100));
    }
  }
  play() {
    this.state.track.play();
    this.setState({ playback: true });
    clearInterval(this.timePoll);
    this.timePoll = setInterval(() => {
      this.setState({
        progress: this.state.track.getTime(),
      });
    }, 50);
  }
  pause() {
    this.state.track.pause();
    this.setState({ playback: false });
    clearInterval(this.timePoll);
    clearInterval(this.showWords);
  }
  trackInfo(href) {
    fetch(href, options)
    .then((res) => res.json())
    .then((value) => {
      this.setState({ trackInfo: value });
      this.setState({ track: new buzz.sound(value.preview_url) });
      this.state.track.bind('ended', () => {
        this.pause();
      });
    })
    .then(() => {
      this.getWords();
    });
  }
  audioFeatures(id) {
    fetch(`https://api.spotify.com/v1/audio-features/${id}`, options)
    .then((res) => res.json())
    .then((value) => {
      this.setState({ audioFeatures: value });
      return value.track_href;
    })
    .then(() => {
      this.trackInfo(this.state.audioFeatures.track_href);
    });
  }
  render() {
    let cover = (this.state.trackInfo)
      ? this.state.trackInfo.album.images[0].url : null;
    let seeking = (this.state.track)
      ? <Seeking
        progress={this.state.progress}
        duration={parseFloat(this.state.track.getDuration())}
      /> : null;
    let name = (this.state.trackInfo)
      ? this.state.trackInfo.name : null;
    let audioFeatures = (this.state.audioFeatures)
      ? <span id="audio-features">
        <span className="audio-feature">
          <span className="bold">Danceability</span>: {this.state.audioFeatures.danceability}
        </span>
        <span className="audio-feature">
          <span className="bold">Energy</span>: {this.state.audioFeatures.energy}
        </span>
        <span className="audio-feature">
          <span className="bold">Loudness</span>: {this.state.audioFeatures.loudness}
        </span>
        <span className="audio-feature">
          <span className="bold">Mode</span>: {this.state.audioFeatures.mode}
        </span>
        <span className="audio-feature">
          <span className="bold">Speechiness</span>: {this.state.audioFeatures.speechiness}
        </span>
        <span className="audio-feature">
          <span className="bold">Acousticness</span>: {this.state.audioFeatures.acousticness}
        </span>
        <span className="audio-feature">
          <span className="bold">Instrumentalness</span>: {this.state.audioFeatures.instrumentalness}
        </span>
        <span className="audio-feature">
          <span className="bold">Liveness</span>: {this.state.audioFeatures.liveness}
        </span>
        <span className="audio-feature">
          <span className="bold">Valence</span>: {this.state.audioFeatures.valence}
        </span>
        <span className="audio-feature">
          <span className="bold">Tempo</span>: {this.state.audioFeatures.tempo}
        </span>
      </span> : null;

    return (
      <div
        className="track"
      >
        <div
          className={
            classnames('border', { show: this.state.playback })
          }
        >
        </div>
        <div className="track-album-cover-container">
          <span className="track-name bold">
            {name}
          </span>
          {audioFeatures}
          <img
            src={cover}
            className="track-album-cover"
            onClick={this.playback}
          />
          <div className="back-container" >
            <span
              className="back"
              onClick={this.goBack}
            >
              <span className="arrow">←</span>
               Back
            </span>
          </div>
        </div>
        <TransitionGroup
          transitionName="fade"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          {
            this.state.showingWords.map((word) =>
              <span
                className="word"
                style={{
                  fontSize: word.size,
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                  zIndex: word.z,
                }}
                key={word.id + word.word}
              >
                {word.word}
              </span>
            )
          }
        </TransitionGroup>
        {seeking}
      </div>
    );
  }
}

TrackEntryPoint.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = TrackEntryPoint;
