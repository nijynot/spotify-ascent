import React from 'react';

import ResultItem from './ResultItem.js';

require('../../scss/results.scss');

function Results(props) {
  return (
    <div className="results">
      {props.tracks.map((track) =>
        <ResultItem
          id={track.id}
          name={track.name}
          artists={track.artists}
          key={track.id}
        />
      )}
    </div>
  );
}

Results.propTypes = {
  tracks: React.PropTypes.array,
};

module.exports = Results;
