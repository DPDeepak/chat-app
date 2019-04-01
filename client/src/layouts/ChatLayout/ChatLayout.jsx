import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element.isRequired,
};

class ChatLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <div style={{ margin: 10 }} className="main">{children}</div>
      </>
    );
  }
}
ChatLayout.propTypes = propTypes;

export default ChatLayout;
