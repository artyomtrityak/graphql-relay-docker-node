import React from 'react';
import Relay from 'react-relay';


class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Users list</h1>
        <ul>
          {this.props.viewer.users.map(user =>
            <li key={user.id}>{user.email} (ID: {user.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on RootViewerType {
        users(page: 1) {
          id,
          email
        },
      }
    `
  }
});
