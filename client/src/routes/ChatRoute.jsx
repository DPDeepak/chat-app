import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChatLayout } from '../layouts';

const propTypes = {
  component: PropTypes.element.isRequired,
};

class ChatRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: ChildComponent, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <ChatLayout>
            <ChildComponent {...matchProps} />
          </ChatLayout>
        )}
      />
    );
  }
}
ChatRoute.propTypes = propTypes;

export default ChatRoute;
