import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';

class GetFriendsSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { subscribe } = this.props;
        subscribe()
    }

    render() {
        const { data, from } = this.props;

        return (
            <>
            {   data.friends.map(to =>
                <div style={{ textAlign: 'center', margin: 10 }}>
                  <Button variant="contained" color="primary" >
                   <Link color="inherit" underline="none" component={RouterLink} to={`/start/${from}/${to}`}>
                   {to}
                   </Link>
                   </Button>
               </div>)
           }
           </>
        )
    }
}

export default GetFriendsSubscription;