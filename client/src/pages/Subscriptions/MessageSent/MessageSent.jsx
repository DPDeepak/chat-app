import React from 'react';
import gql from 'graphql-tag';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const CHAT_CHANNEL = gql`
    subscription{
        messageSent{
            to
            from
            message
    }
}
`;

const styles = theme => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing.unit,
    },
  });
  

class MessageSent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { subscribeToMore } = this.props;
        subscribeToMore({
            document: CHAT_CHANNEL,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return {
                    messages: [
                        ...prev.messages,
                        subscriptionData.data.messageSent,
                    ],
                };
            },
        });
    }

    render() {
        const { messages, to, from } = this.props;
        return messages.map(message => {
            if (message) {
                if (message.to === to && message.from === from) {
                    return (
                        <div style={{ textAlign: "end" }}>
                            <TextField
                                value={message.message}
                                label={from}
                                // multiline={true}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        //  <div className={this.props.classes.root}>{message.message}</div>
                    );
                }
                if (message.to === from && message.from === to) {
                    return (
                        <div>
                            <TextField
                                value={message.message}
                                label={to}
                                // multiline={true}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        // <div className={this.props.classes.root}>{message.message}</div>
                    );
                }
            }
        });
    }
}
MessageSent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(MessageSent);