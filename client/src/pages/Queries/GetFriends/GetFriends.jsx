import React from 'react';
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from "graphql-tag";
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
            <Query query={FRIENDS} variables={{ from }} pollInterval={300} >
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <CircularProgress />;
                    if (error) return `Error!: ${error}`;
                    return (
                        <>
                        <GetFriendsSubscription  subscribe={()=>this.handleSubscription(subscribeToMore)} data={data} from={from} />
                     
                </>
                    
                    );
                }}
            </Query>
        );
    }
}

export default GetFriends;