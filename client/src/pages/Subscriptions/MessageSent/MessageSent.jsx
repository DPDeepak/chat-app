import React from 'react';
import gql from 'graphql-tag';
import { TextField } from '@material-ui/core';

const CHAT_CHANNEL = gql`
    subscription{
        messageSent{
            to
            from
            message
    }
}
`;

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
                        <div style={{textAlign:"end"}}>
                            <TextField
                                value={message.message}
                                label={from}
                                margin="normal"
                                variant="outlined"
                                readOnly
                            />
                        </div>
                    );
                }
                if (message.to === from && message.from === to) {
                    return (
                        <div>
                            <TextField
                                value={message.message}
                                label={to}
                                margin="normal"
                                variant="outlined"
                                readOnly
                            />
                        </div>
                    );
                }
            }
            });
    }
}

export default MessageSent;