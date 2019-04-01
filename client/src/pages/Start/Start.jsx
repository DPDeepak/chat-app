import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GetUser } from '../Queries'
import AddUser from '../Queries/AddUser';

const Style = {
    marginTop: 375,
    marginLeft: 700,
    maxWidth: '150px',
    maxHeight: '150px',
    minWidth: '150px',
    minHeight: '150px'
}


class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            email: '',
            hitQuery: false,
            disable: false,
            hitAddUserQuery: false,
        }
    }

    handlechange = field => (event) => {
        this.setState({
            [field]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.setState({
            open: false,
            hitQuery: true,
            disable: true,
        });
    };

    handleNewUser = (event) => {
        event.preventDefault()
        this.setState({
            open: false,
            hitAddUserQuery: true,
            disable: true,
        });
    }

    handleNewUserClose = () => {
        this.setState({
            hitAddUserQuery: false,
        });
    }

    


    render() {
        const { name, email, hitQuery, disable, hitAddUserQuery } = this.state;
        console.log('---', disable);

        return (
            <div>
                {
                    (disable) ?
                        ''
                        :
                        <Button style={Style} variant="contained" color="primary" onClick={this.handleClickOpen} >
                            Start App
                          </Button>
                }
                {
                    (hitQuery) ? (
                        <GetUser name={name} email={email} />
                    ) : ''
                }
                {
                    (hitAddUserQuery) ? (
                        <AddUser name={name} email={email} closeUserMaking={this.handleNewUserClose}  />
                    ) : ''
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            label="Name"
                            fullWidth
                            // onClick={this.handlechange('name')}
                            onChange={this.handlechange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={email}
                            label="Email Address"
                            fullWidth
                            // onClick={this.handlechange('email')}
                            onChange={this.handlechange('email')}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained"
                         color="primary" 
                         onClick={(event)=>this.handleNewUser(event)} 
                        
                        >
                            New User
                      </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Start;
