import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import GetFriends from '../GetFriends';

const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!){
        addUser(name: $name, email: $email){
            name
        }
    }`;

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopCreation: true,
        };
    }
    handleCreation = (addUser) => {
        const { name, email } = this.props;
        addUser({ variables: { name, email } });
        this.setState({
            stopCreation: false,
        })
    }
    render() {
        const { name, email } = this.props;
        const { stopCreation } = this.state;
        return (stopCreation) ? <Mutation mutation={ADD_USER}>
            {(addUser, { data }) => {
                this.handleCreation(addUser)
                return <GetFriends from={name} />
            }

            }
        </Mutation>
            : 
             (<GetFriends from={name} />)
    }
}

export default AddUser;
