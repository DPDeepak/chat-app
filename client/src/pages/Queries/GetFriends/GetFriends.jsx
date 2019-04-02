import React from 'react';
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import gql from "graphql-tag";
import { Button } from '@material-ui/core';
import GetFriendsSubscription from './GetFriendsSubscription';

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
              if (!subscriptionData.data) return prev;
              return {
                  friends: [...prev.friends,subscriptionData.data.userCreated.name]
              };
            }
        }) 
    }

    render() {
        const { from } = this.props;        
        return (
            <Query query={FRIENDS} variables={{ from }} >
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <CircularProgress />;
                    if (error) return `Error!: ${error}`;
                    // this.handleSubscription(subscribeToMore)
                    return (
                        <>
                        <GetFriendsSubscription subscribe={()=>this.handleSubscription(subscribeToMore)} data={data} from={from} />
                     
                </>
                    
                    );
                }}
            </Query>
        );
    }
}

export default GetFriends;