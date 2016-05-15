import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import App from './App.js';
import TrackEntryPoint from './entrypoints/TrackEntryPoint.js';

render(
  <Router history={browserHistory}>
    <Route
      path="/spotify-relevant/"
      component={App}
    />
    <Route
      path="/spotify-relevant/track/:id"
      component={TrackEntryPoint}
    />
  </Router>,
  document.getElementById('wrap')
);
