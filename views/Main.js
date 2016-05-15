import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import App from './App.js';
import TrackEntryPoint from './entrypoints/TrackEntryPoint.js';

render(
  <Router history={browserHistory}>
    <Route
      path="/spotify-ascent/"
      component={App}
    />
    <Route
      path="/spotify-ascent/track/:id"
      component={TrackEntryPoint}
    />
  </Router>,
  document.getElementById('wrap')
);
