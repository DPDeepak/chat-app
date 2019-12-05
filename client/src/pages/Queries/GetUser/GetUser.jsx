import React from 'react';
import { CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GetFriends from '../GetFriends';
import NoMatch from '../../NoMatch/NoMatch';

const GET_USERS = gql`
    query User($name: String!, $email: String!){
        user(name: $name, email: $email){
            name
        }
    }`;

class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { name, email } = this.props;
        return <Query query={GET_USERS} variables={{ name, email }}>
            {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error) return `Error!: ${error}`;
                if (data.user) {
                    return <GetFriends from={data.user.name} />
                }
                else {
                    return <NoMatch heading="!!No Match Found!!" message="Details does not match with any user"/>
                }
            }}
        </Query>
    }
}

export default GetUser;