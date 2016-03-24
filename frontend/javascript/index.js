import App from './components/app.component';
import AppHomeRoute from './routes/app-home.route';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://192.168.99.100:5000/graphql', {
    credentials: 'same-origin'
  })
);

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
