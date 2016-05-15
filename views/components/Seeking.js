import React from 'react';

require('../../scss/seeking.scss');

function Seeking(props) {
  return (
    <div className="seek-bar">
      <div className="seeking">
      </div>
      <div
        className="progress"
        style={{
          width: `${(props.progress / props.duration) * 100}%`,
        }}
      >
      </div>
    </div>
  );
}

Seeking.propTypes = {
  progress: React.PropTypes.number,
  duration: React.PropTypes.number,
};

module.exports = Seeking;
