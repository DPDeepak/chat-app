import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { GetMessages } from '../Queries';
import Send from '@material-ui/icons/Send';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SEND_MESSAGE = gql`
mutation SendMessage($to: String!, $from: String!, $message: String!){
    sendMessage(to: $to, from: $from, message: $message){
        to
        from
        message
    }
}`;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleClose = () => {
        const { history } = this.props;
        history.push('/start');
    }

    handlechange = field => (event) => {
        this.setState({
            [field]: event.target.value,
            sendMessage: false,
        });
    };

    handleClick = (e, sendMessage, to, from, message) => {
        e.preventDefault();
        sendMessage({ variables: { to, from, message } });
        this.setState({
            message: '',
        })
    }

    render() {
        const { match, classes } = this.props;
        const { message } = this.state;
        const { from, to } = match.params;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {to}
                        </Typography>
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>

                </AppBar>
                <div style={{ overflow: "scroll", height: 570 }}>
                    <GetMessages to={to} from={from} />
                </div>
                <Mutation mutation={SEND_MESSAGE}>
                    {(sendMessage, { data }) => (
                        <TextField
                            value={message}
                            label="Message"
                            fullWidth
                            onChange={this.handlechange('message')}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton className={classes.button} onClick={(e) => {
                                            if (message) {
                                                this.handleClick(e, sendMessage, to, from, message);
                                            }
                                        }}>
                                            <Send />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles(styles)(ChatBox);