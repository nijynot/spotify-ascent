import React from 'react';
import { Link } from 'react-router';
import { encode } from 'querystring';

import { getHashParams } from '../../config/hash.js';

require('../../scss/resultItem.scss');

function ResultItem(props) {
  return (
    <div className="result-item">
      <span className="result-name bold">
        <Link
          to={`/track/${props.id}#${encode(getHashParams())}`}
        >
          {props.name}
        </Link>
      </span>
      {props.artists.map((artist) => {
        return (
          <span
            className="result-artist"
            key={artist.id}
          >
            {artist.name},
          </span>
        );
      })}
    </div>
  );
}

ResultItem.propTypes = {
  name: React.PropTypes.string,
  artists: React.PropTypes.array,
};

module.exports = ResultItem;
