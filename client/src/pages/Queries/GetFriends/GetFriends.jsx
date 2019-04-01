import React from 'react';
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import gql from "graphql-tag";
import { Button } from '@material-ui/core';

const FRIENDS = gql`
    query Friends($from: String!){
        friends(name: $from)
    }`;

const User_Created_Subscription = gql`
subscription{
    userCreated{
      id
      name
      email
      friends
    }
  }
`

class GetFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubscription = (subscribeToMore) => {
        subscribeToMore({
            document: User_Created_Subscription,
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev,'------------------------------------------------');
                console.log(subscriptionData,'==================================');
                
                
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.userCreated;
                console.log('===>',newFeedItem);
                
            //   return Object.assign({}, prev, {
            //     entry: {
            //       comments: [newFeedItem, ...prev.entry.comments]
            //     }
            //   });
            }
        }) 
    }

    render() {
        const { from } = this.props;        
        return (
            <Query query={FRIENDS} variables={{ from }} pollInterval={300} >
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <CircularProgress />;
                    if (error) return `Error!: ${error}`;
                    this.handleSubscription(subscribeToMore)
                    return data.friends.map(to =>
                     <div style={{ textAlign: 'center', margin: 10 }}>
                       <Button variant="contained" color="primary" >
                        <Link color="inherit" underline="none" component={RouterLink} to={`/start/${from}/${to}`}>
                        {to}
                        </Link>
                        </Button>
                    </div>);
                }}
            </Query>
        );
    }
}

export default GetFriends;